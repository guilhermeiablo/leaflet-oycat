var tileUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
var osmAttrib = '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy;<a href="http://urplatform.eu">URP</a> &copy;<a href="http://cartodb.com/attributions">CartoDB</a> ';
var osm = L.tileLayer(tileUrl, {
  maxZoom: 19,
  attribution: osmAttrib,
  noWrap: true
});
var map = L.map('map', {
  zoomControl: false,
  layers: [osm],
  center: new L.LatLng(56.18,-0.33),
  zoom: 5,
  maxBounds: [[90,-180], [-90, 180]]
});


map.createPane('pane0');
map.getPane('pane0').style.zIndex = 249;

map.createPane('pane1');
map.getPane('pane1').style.zIndex = 250;

map.createPane('pane2');
map.getPane('pane2').style.zIndex = 251;

map.createPane('pane3');
map.getPane('pane3').style.zIndex = 252;

map.createPane('pane4');
map.getPane('pane4').style.zIndex = 253;



var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
  grades = ["Decommissioning Yard","Yard receiving higher demand than capacity", "Yard operating within technical capacity"," ", "Operational platform", "Decommissioned Platform", "Decommissioned this year"],
  labels = ['svg/yard.svg','svg/fullyard.svg', 'svg/emptyyard.svg', 'svg/blank.svg','svg/operationalplatforms.svg','svg/decommissionedplatforms.svg','svg/current.svg'];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
    "<div>" + grades[i] + (" <img src="+ labels[i] +" style='vertical-align:middle' height='25' width='25'>") +'</div>';
  }

  return div;
};

legend.addTo(map);
