var AddQuote, build_pollutants_content, build_pollutants_nav, global_pollutants;

AddQuote = (function() {
  var _add_to_list, _initialize;
  _initialize = function() {
    return _add_to_list();
  };
  _add_to_list = function() {
    var _quote_div;
    _quote_div = $('#quote');
    return $.getJSON('../data/air_quotes.json', function(data) {
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

build_pollutants_nav = function(shortcut, short_name, index) {
  var cls;
  console.log(index);
  cls = index === 0 ? 'active' : '';
  return "<li class='" + cls + "'><a href='#" + shortcut + "' aria-controls='" + shortcut + "' role='tab' data-toggle='tab'>" + short_name + "</a></li>";
};

build_pollutants_content = function(pollutant, shortcut, extract, index) {
  var _link, cls;
  cls = index === 0 ? 'active' : '';
  _link = "/pollutant.html#" + ("" + shortcut);
  return "<div class='tab-pane " + cls + "' id='" + shortcut + "'> <div class='text'> <h3 class='title'>" + pollutant + "</h3> <p>" + extract + "</p> <div class='more more2'> <a href='" + _link + "' class='button-pipaluk button--inverted'>Leer Más</a> </div> </div> </div>";
};

global_pollutants = function() {
  return $.getJSON('../data/pollutants.json', function(data) {
    var div_content, div_navs;
    div_navs = $("#pollutants-nav ul");
    div_content = $("#pollutants-content");
    return $.map(data, function(val, i) {
      div_navs.append(build_pollutants_nav(val.shortcut, val.short_name, i));
      div_content.append(build_pollutants_content(val.pollutant, val.shortcut, val.extract, i));
      return $('#pollutants-nav a').click(function(e) {
        e.preventDefault();
        return $(this).tab('show');
      });
    });
  });
};

$(document).on('page:load ready', function() {
  AddQuote.add();
  return global_pollutants();
});
