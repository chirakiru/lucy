var HOST, build_chart_oms_post, last_month_station;

HOST = "http://40.84.189.192:8086";

last_month_station = function(station, concentration) {
  var measurements, query;
  query = ("SELECT \"concentration_" + concentration + "\" FROM airquality..air WHERE pollutant = '" + concentration + "' AND station = '") + station + ("' AND \"concentration_" + concentration + "\" > 0");
  return measurements = $.ajax({
    url: HOST + '/query',
    dataType: 'json',
    type: 'GET',
    data: {
      db: 'airquality',
      epoch: 'ms',
      q: query
    },
    success: function(data) {
      return build_chart_oms_post(data, concentration);
    }
  });
};

build_chart_oms_post = function(measurements, concentration) {
  var data;
  data = measurements.results[0].series[0].values;
  Highcharts.setOptions({
    lang: {
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Nov', 'Dic']
    }
  });
  return $('#chart-container-oms').highcharts({
    chart: {
      zoomType: 'x'
    },
    title: {
      text: "Concentraciones " + concentration + " a través del tiempo"
    },
    subtitle: {
      text: document.ontouchstart === void 0 ? 'Haga clic y arrastre en el área de trazado para hacer un zoom' : 'Arrastra la tabla para hacer un zoom'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Concentración'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [[0, Highcharts.getOptions().colors[0]], [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    series: [
      {
        type: 'area',
        name: "Concentración de " + concentration,
        data: data
      }
    ]
  });
};

$(document).on('page: ready', function() {
  last_month_station(2, 'PM2.5');
  return $('#pollutant-char').on('change', function() {
    last_month_station(2, this.value);
  });
});
