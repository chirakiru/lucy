AddQuote = (->  
  _initialize = () ->
    do _add_to_list

  _add_to_list = () ->
    _quote_div  = $('#quote')
    $.getJSON '../data/air_quotes.json', (data) ->
      entry = data[Math.floor(Math.random() * data.length)]
      content = "<h5>#{entry.quote}</h5><h4>- #{entry.author}</h4>"
      _quote_div.append content
      return

  add: _initialize
)()

build_pollutants_nav = (shortcut, short_name, index) ->
  cls = if index == 0 then 'active' else ''
  "<li class='#{cls}'><a href='##{shortcut}' aria-controls='#{shortcut}' role='tab' data-toggle='tab'>#{short_name}</a></li>"

build_pollutants_content = (pollutant, shortcut, extract, index) ->
  cls = if index == 0 then 'active' else ''
  _link = "/pollutants/#{shortcut}.html"
  "<div class='tab-pane #{cls}' id='#{shortcut}'>
    <div class='text'>
      <h3 class='title'>#{pollutant}</h3>
      <p>#{extract}</p>
      <div class='more more2'>
        <a href='#{_link}' class='button-pipaluk button--inverted'>Leer Más</a>
      </div>  
    </div>
  </div>"

global_pollutants = () ->
  $.getJSON '../data/pollutants.json', (data) ->
    div_navs = $("#pollutants-nav ul")
    div_content = $("#pollutants-content")
    $.map data, (val, i) ->
      div_navs.append build_pollutants_nav(val.shortcut, val.short_name, i)
      div_content.append build_pollutants_content(val.pollutant,val.shortcut,val.extract, i)
      $('#pollutants-nav a').click (e) ->
        e.preventDefault()
        $(this).tab 'show'

$(document).on 'page:load ready', ->
  AddQuote.add()
  do global_pollutants