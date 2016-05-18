L.Control.Selector = L.Control.extend({
  options: {
    // topright, topleft, bottomleft, bottomright
    position: 'topright',
    placeholder: 'edmt was here'
  },
  initialize: function (options /*{ data: {...}  }*/) {
    // constructor
    L.Util.setOptions(this, options);
  },
  onAdd: function (map) {
    // happens after added to map
    var container = L.DomUtil.create('div', 'info');
    var form      = L.DomUtil.create('form', 'form', container);
    var group     = L.DomUtil.create('div', 'form-group', form);
    var label     = L.DomUtil.create('label', '', group);

    label.textContent = 'Filtrar por contaminante';
    this.select       = L.DomUtil.create('select', 'form-control', group);

    var opt1   = L.DomUtil.create('option', '', this.select);
    opt1.text  = 'Partículas menores a 10 µm (PM10)';
    opt1.value = 'PM10';
    var opt2   = L.DomUtil.create('option', '', this.select);
    opt2.text  = 'Partículas menores a 2.5 µm (PM2.5)';
    opt2.value = 'PM2.5';
    var opt3   = L.DomUtil.create('option', '', this.select);
    opt3.text  = 'Ozono (O3)';
    opt3.value = 'O3';
    var opt4   = L.DomUtil.create('option', '', this.select);
    opt4.text  = 'Monóxido de carbono (CO)';
    opt4.value = 'CO';
    var opt5   = L.DomUtil.create('option', '', this.select);
    opt5.text  = 'Óxido de Nitrógeno (NO2)';
    opt5.value = 'NO2';
    var opt6   = L.DomUtil.create('option', '', this.select);
    opt6.text  = 'Dióxido de azufre (SO2)';
    opt6.value = 'SO2';

    this.select.value = this.options.default;

    L.DomEvent.addListener(this.select, 'change', this.change, this);
    L.DomEvent.disableClickPropagation(container);
    return container;
  },
  onRemove: function (map) {
    // when removed
    L.DomEvent.removeListener(this.select, 'change', this.change, this);
  },
  change: function(e) {
    // L.DomEvent.preventDefault(e);
    showMap(e.target.value)
  }
});

L.control.selector = function(id, options) {
  return new L.Control.Selector(id, options);
}
