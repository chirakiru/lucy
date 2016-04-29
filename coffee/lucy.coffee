AddQuote = (->  
  _initialize = () ->
    do _add_to_list

  _add_to_list = () ->
    _quote_div  = $('#quote')
    $.getJSON '../air_quotes.json', (data) ->
      entry = data[Math.floor(Math.random() * data.length)]
      content = "<h5>#{entry.quote}</h5><h4>- #{entry.author}</h4>"
      _quote_div.append content
      return

  add: _initialize
)()

$(document).on 'page:load ready', ->
  map = L.map('mtymap',
    center: [
      51.505
      -0.09
    ]
    zoom: 13)
  console.log 'jjjj'
  AddQuote.add()