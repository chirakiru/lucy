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

build_pollutants_nav = (shortcut, short_name) ->
  "<li><a href='##{shortcut}' aria-controls='#{shortcut}' role='tab' data-toggle='tab'>#{short_name}</a></li>"

build_pollutants_content = (pollutant, shortcut, description) ->
  _link = "/pollutant.html#"+"#{shortcut}"
  "<div class='tab-pane' id='#{shortcut}'>
    <div class='text'>
      <h3 class='title'>#{pollutant}</h3>
      <p>#{description}</p>
      <div class='more more2'>
        <a href='#{_link}' class='button-pipaluk button--inverted'>Read More</a>
      </div>  
    </div>
  </div>"

global_pollutants = () ->
  $.getJSON '../data/pollutants.json', (data) ->
    div_navs = $("#pollutants-nav ul")
    div_content = $("#pollutants-content")
    $.map data, (val, i) ->
      div_navs.append build_pollutants_nav(val.shortcut, val.short_name)
      div_content.append build_pollutants_content(val.pollutant,val.shortcut,val.description)
      $('#pollutants-nav a').click (e) ->
        console.log 'activate'
        e.preventDefault()
        $(this).tab 'show'

$(document).on 'page:load ready', ->
  AddQuote.add()
  do global_pollutants