var AddQuote;

AddQuote = (function() {
  var _add_to_list, _initialize;
  _initialize = function() {
    return _add_to_list();
  };
  _add_to_list = function() {
    var _quote_div;
    _quote_div = $('#quote');
    return $.getJSON('../air_quotes.json', function(data) {
      var content, entry;
      entry = data[Math.floor(Math.random() * data.length)];
      content = "<h5>" + entry.quote + "</h5><h4>- " + entry.author + "</h4>";
      _quote_div.append(content);
    });
  };
  return {
    add: _initialize
  };
})();

$(document).on('page:load ready', function() {
  var map;
  map = L.map('mtymap', {
    center: [51.505, -0.09],
    zoom: 13
  });
  console.log('jjjj');
  return AddQuote.add();
});
