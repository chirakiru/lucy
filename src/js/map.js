var lmap;
var HOST = "http://40.84.189.192:8086"
var stations, measurements, monitoringStations;

function showMap(pollutant) {
    $.ajax({
        url: "data/stations.json",
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            stations = data;
        }.bind(this),
    }).then(function() {
        return $.ajax({
            url: HOST + "/query",
            dataType: 'json',
            type: 'GET',
            data: {
                db: "airquality",
                epoch:"ms",
                q: "SELECT value FROM airquality..air where pollutant = '" + pollutant + "' GROUP BY station, pollutant order by time desc limit 1"
            },
            success: function(data) {
                measurements = data
            }.bind(this)
        })
    }).then(function(){
        var features = stations.map(function(station) {
            measure = measurements.results[0].series.find(function(serie) {
                return serie.tags.station == station.id
            })
            return {
                "id": station.id,
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": station.coordinates
                },
                "properties": {
                    "name": station.name  + ' #' + station.id,
                    "popupContent": station.name + ' #' + station.id + " <br/>" + station.address,
                    value: measure.values[0][1],
                    time:  measure.values[0][0],
                },
            }
        })
        monitoringStations = {
            "type": "FeatureCollection",
            "features": features
        }
    }).then(function() {
        if(lmap) { lmap.remove() };
        // Mapa ubicado en Monterrey, con scroll deshabilitado
        var map = L.map('mtymap', {
            center: [25.7043,-100.32],
            zoom: 11,
            minZoom: 11,
            maxZoom: 13,
            scrollWheelZoom: false,
        });
        lmap = map;

        // Mapa en grises
        map.zoomControl.setPosition('bottomleft');
        L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, ' +
              '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Datos de calidad del aire &copy; <a href="http://aire.nl.gob.mx/sima/">SIMA</a>'
        }).addTo(map);

        // Variable para conservar el estado de la capa de geoJson
        var geojson;

        function onEachFeature(feature, layer) {
            var popupContent = '';

            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }
            layer.bindPopup(popupContent);

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
        }

        function getColor(d) {
            return d > 200  ? '#6b006d':
                   d > 150  ? '#f50000':
                   d > 100  ? '#f88900':
                   d > 50   ? '#FFFF00':
                   d > 0    ? '#2ec800':
                              'rgb(80, 80, 80)';
        }

        function getLabel(d) {
            return d > 200  ? 'Extremadamente mala':
                   d > 150  ? 'Muy mala':
                   d > 100  ? 'Mala':
                   d > 50   ? 'Regular':
                   d > 0    ? 'Buena':
                              'No disponible';
        }

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 1
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
            info.update(layer.feature.properties);
        }

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

        geojson = L.geoJson([monitoringStations], {
            style: function (feature) {
                return feature.properties && feature.properties.style;
            },

            onEachFeature: onEachFeature,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 18,
                    fillColor: getColor(feature.properties.value),
                    color: getColor(feature.properties.value),
                    fillOpacity: 0.7,
                    weight: 2
                });
            }
        }).addTo(map);

        /* Custom control */
        L.control.selector({
          default: pollutant
        }).addTo(map);

        /* Control esquina superior derecha */
        var info = L.control();
        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // div con clase "info"
            this._div.style = "width: 296px;"
            this.update();
            return this._div;
        };
        info.update = function (props) {
            this._div.innerHTML = ''//'<h5>Calidad del aire en el &aacute;rea metropolitana</h5>';

            if(props) {
                if(props.value > 0) {
                    this._div.innerHTML += '<h6>' + props.name + '</h6>' +
                    '<h6>' + moment(props.time).locale("es").utcOffset(0).format("LLLL")  +'</h6>' +
                    '<b>' + props.value + ' ' + pollutant + '</b>';
                } else {
                    this._div.innerHTML += 'No disponible / Mantenimiento';
                }
            } else {
                this._div.innerHTML += 'Pasa el cursor por una estaci&oacute;n';
            }
        };
        info.addTo(map);


        /* Control esquina inferior derecha */
        var legend = L.control({ position: 'bottomright' });
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [1, 50, 100, 150, 200],
                labels = [],
                levels = ["Buena", "Regular", "Mala", "Muy Mala", "Extremadamente Mala"],
                from, to;

            for (var i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push(
                    '<i title="' + getLabel(from + 1) + '" style="background:' + getColor(from + 1) + '"></i> ' +
                    from + (to ? '&ndash;' + to : '+') + ' (' + levels[i] + ')') ;
            }
            labels.push('<i style="background:' + getColor(0) + '"></i>' + getLabel(0))

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(map);


        /* Logotipo */
        var logo = L.control({ position: 'topleft' });

        logo.onAdd = function (map) {
            var div = L.DomUtil.create('div', '');
            div.innerHTML += "<a href=\"http://unrespiroamiciudad.com\" target=\"_blank\"><img src=\"/images/lucy_logo.png\" style=\"height: 80px\"/></a>";
            return div;
        };

        logo.addTo(map);
    })

}

showMap('PM10');
