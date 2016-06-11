HOST = "http://40.84.189.192:8086"

last_month_station = (station, concentration) ->
  query = "SELECT \"concentration_#{concentration}\" FROM airquality..air WHERE pollutant = '#{concentration}' AND station = '" + station + "' "
  measurements = $.ajax
    url: HOST + '/query'
    dataType: 'json'
    type: 'GET'
    data:
      db: 'airquality'
      epoch: 'ms'
      q: query
    success: (data) ->
      build_chart_oms_post(data, concentration)

average_per_week = (station, concentration, weeks) ->
  query = "SELECT mean(\"concentration_#{concentration}\") FROM airquality..air WHERE time > now() - #{weeks}w AND pollutant = '#{concentration}' AND station = '#{station}' GROUP BY time(1d)"
  measurements = $.ajax
    url: HOST + '/query'
    dataType: 'json'
    type: 'GET'
    data:
      db: 'airquality'
      epoch: 'ms'
      q: query
    success: (data) ->
      build_chart_avg(data, concentration)

build_chart_avg = (measurements, concentration) ->
  if measurements.results[0].series != undefined
    data = measurements.results[0].series[0].values
    Highcharts.setOptions lang:
      months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      weekdays: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
      shortMonths: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Nov','Dic']
    $('#chart-container-average').highcharts
      chart: zoomType: 'x'
      title: text: "Promedio de concentraciones #{concentration} a través del tiempo"
      subtitle: text: if document.ontouchstart == undefined then 'Haga clic y arrastre en el área de trazado para hacer un zoom' else 'Arrastra la tabla para hacer un zoom'
      xAxis: type: 'datetime'
      yAxis: title: text: 'Concentración'
      legend: enabled: false
      plotOptions: area:
        fillColor:
          linearGradient:
            x1: 0
            y1: 0
            x2: 0
            y2: 1
          stops: [
            [
              0
              Highcharts.getOptions().colors[0]
            ]
            [
              1
              Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')
            ]
          ]
        marker: radius: 2
        lineWidth: 1
        states: hover: lineWidth: 1
        threshold: null
      series: [ {
        type: 'area'
        name: "Concentración de #{concentration}"
        data: data
        zones: [{
          value: 42,
          color: '#90ed7d'
        }, {
          value: 100,
          color: '#f7a35c'
        }, {
          color: '#ff423e'
        }]
      } ]
  else
    $('#chart-container-average').highcharts
      title: text: "Lo sentimos no contamos con datos de este contaminate para esta estación."
      series: [ {
        type: 'area'
        name: 'Datos no encontrados'
        data: []
      } ]
      lang: 
        noData: 'u_u'
      noData: style:
        fontWeight: 'bold'
        fontSize: '15px'
        color: '#303030'

build_chart_oms_post = (measurements, concentration) ->
  if measurements.results[0].series != undefined
    data = measurements.results[0].series[0].values
    Highcharts.setOptions lang:
      months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      weekdays: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
      shortMonths: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Nov','Dic']
    $('#chart-container-oms').highcharts
      chart: zoomType: 'x'
      title: text: "Concentraciones #{concentration} a través del tiempo"
      subtitle: text: if document.ontouchstart == undefined then 'Haga clic y arrastre en el área de trazado para hacer un zoom' else 'Arrastra la tabla para hacer un zoom'
      xAxis: type: 'datetime'
      yAxis: title: text: 'Concentración'
      legend: enabled: false
      plotOptions: area:
        fillColor:
          linearGradient:
            x1: 0
            y1: 0
            x2: 0
            y2: 1
          stops: [
            [
              0
              Highcharts.getOptions().colors[0]
            ]
            [
              1
              Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')
            ]
          ]
        marker: radius: 2
        lineWidth: 1
        states: hover: lineWidth: 1
        threshold: null
      series: [ {
        type: 'area'
        name: "Concentración de #{concentration}"
        data: data
      } ]
  else
    $('#chart-container-average').highcharts
      title: text: "Lo sentimos, por el momento no contamos con datos del contaminate para la estación seleccionada."
      series: [ {
        type: 'area'
        name: 'Datos no encontrados'
        data: []
      } ]
      lang: 
        noData: 'u_u'
      noData: style:
        fontWeight: 'bold'
        fontSize: '15px'
        color: '#303030'  

$(document).on 'page: ready', ->
  $('table').addClass('table table-bordered')

  last_month_station(2, 'PM2.5')
  average_per_week(2, 'PM2.5', 4)
  $('#pollutant-char').on 'change', ->
    last_month_station(2, @value)
    average_per_week(2, @value, 4)
    return
  $('#station-char').on 'change', ->
    pollutant = $('#pollutant-char').val()
    last_month_station(@value, pollutant)
    average_per_week(@value, pollutant, 4)
    return
