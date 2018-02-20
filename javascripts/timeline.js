function replcSpecChar($string){
  $string = preg_replace("æ", "&aelig;", $string);
  $string = preg_replace("ø", "&oslash;", $string);
  $string = preg_replace("å", "&aring;", $string);
  $string = preg_replace("Æ", "&AElig;", $string);
  $string = preg_replace("Ø", "&Oslash;", $string);
  $string = preg_replace("Å", "&Aring;", $string);

  return $string;
};

var slider = L.timelineSliderControl({
  formatOutput: function(date){
    return moment(date).format("YYYY");
  },
  enableKeyboardControls: true,
  steps:35,
  waitToUpdateMap: false,
  position: 'bottomleft',

});
map.addControl(slider);


Runner.run(window.platformsWithPrefs.features, window.revyards.features);
var test = Runner.printPlatformsOperationnal();

var operationalTimeline = L.timeline(test, {
  pointToLayer: function(feature, latlng){
    var platformsIcon = L.icon({
      iconUrl: 'svg/operationalplatforms.svg',
      iconSize: [15,15]});
      var customOptions =
      {
        'width': '500px',
        'className' : 'custom',
        'white-space': 'nowrap'
      }
      var marker = L.marker(latlng,{icon: platformsIcon, pane: 'pane2'});
      marker.bindPopup('<style>' + 'table {  width: 100%; white-space: nowrap; word-wrap: normal;} tr {  white-space: nowrap;} th { background-color: #cba;} td {  white-space: nowrap; width: 100%; font: 11px/15px Titillium Web, Titillium Web, Titillium Web; height: 3px;  color: black;  background: transparent;}'  +'</style>'+

      '<table>'+
      '<tr>'+
      '<td>'+ feature.properties.Name + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+ 'Currently '+ feature.properties.Current_St + '</td>'+
      '</tr>'+ '</table>' + '<table>'+
      '<tr>'+
      '<td>'+ 'Topside: ' + '</td>'+'<td>'+ feature.properties.Weight_top + ' Te' + '</td>'+
      '</tr>' +
      '<tr>'+
      '<td>'+ 'Jacket: ' + '</td>'+'<td>'+ '<br/>'+ feature.properties.Weight_sub + ' Te' + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+ 'Decom. year: '+ '</td>'+'<td>'+ feature.properties.start.substring(0,4) + '</td>'+
      '</tr>'+
      '</table>'
    );
    return marker;
  }
});
operationalTimeline.addTo(map);
slider.addTimelines(operationalTimeline);

var test2 = Runner.printPlatformsDecommissioned();
var decommissionedTimeline = L.timeline(test2, {
  pointToLayer: function(feature, latlng){
    var platformsIcon = L.icon({
      iconUrl: 'svg/decommissionedplatforms.svg',
      iconSize: [15,15]
    });
    var marker = L.marker(latlng,{icon: platformsIcon, pane: 'pane1'});
    marker.bindPopup('<style>' + 'table {  width: 100%; white-space: nowrap; word-wrap: normal;} tr {  white-space: nowrap;} th { background-color: #cba;} td {  white-space: nowrap; width: 100%; font: 11px/15px Titillium Web, Titillium Web, Titillium Web; height: 3px;  color: black;  background: transparent;}'  +'</style>'+

    '<table>'+
    '<tr>'+
    '<td>'+ feature.properties.Name + '</td>'+
    '</tr>'+
    '<tr>'+
    '<td>'+ 'Currently '+ feature.properties.Current_St + '</td>'+
    '</tr>'+ '</table>' + '<table>'+
    '<tr>'+
    '<td>'+ 'Topside: ' + '</td>'+'<td>'+ feature.properties.Weight_top + ' Te' + '</td>'+
    '</tr>' +
    '<tr>'+
    '<td>'+ 'Jacket: ' + '</td>'+'<td>'+ '<br/>'+ feature.properties.Weight_sub + ' Te' + '</td>'+
    '</tr>'+
    '<tr>'+
    '<td>'+ 'Decom. year: '+ '</td>'+'<td>'+ feature.properties.start.substring(0,4) + '</td>'+
    '</tr>'+
    '</table>');
    return marker;
  }
});
decommissionedTimeline.addTo(map);
slider.addTimelines(decommissionedTimeline);

var test3 = Runner.printPlatformsDecommissionedCurrent();
var platformlistTimeline = L.timeline(test3, {
  pointToLayer: function(feature, latlng){
    var platformsIcon = L.icon({
      iconUrl: 'svg/current.svg',
      iconSize: [15,15]
    });
    var marker = L.marker(latlng,{icon: platformsIcon, pane: 'pane4'});
    marker.bindPopup('<style>' + 'table {  width: 100%; white-space: nowrap; word-wrap: normal;} tr {  white-space: nowrap;} th { background-color: #cba;} td {  white-space: nowrap; width: 100%; font: 11px/15px Titillium Web, Titillium Web, Titillium Web; color: black;  background: transparent;}'  +'</style>'+

    '<table>'+
    '<tr>'+
    '<td>'+ feature.properties.Name + '</td>'+
    '</tr>'+
    '<tr>'+
    '<td>'+ 'Currently '+ feature.properties.Current_St + '</td>'+
    '</tr>'+ '</table>' + '<table>'+
    '<tr>'+
    '<td>'+ 'Topside: ' + '</td>'+'<td>'+ feature.properties.Weight_top + ' Te' + '</td>'+
    '</tr>' +
    '<tr>'+
    '<td>'+ 'Jacket: ' + '</td>'+'<td>'+ '<br/>'+ feature.properties.Weight_sub + ' Te' + '</td>'+
    '</tr>'+
    '<tr>'+
    '<td>'+ 'Decom. year: '+ '</td>'+'<td>'+ feature.properties.start.substring(0,4) + '</td>'+
    '</tr>'+
    '</table>'
  );
  return marker;
}
});
platformlistTimeline.addTo(map);
slider.addTimelines(platformlistTimeline);


var fullyardsTimeline = L.timeline(window.revyards, {
  pointToLayer: function(feature, latlng){
    var platformsIcon = L.icon({
      iconUrl: 'svg/yard.svg',
      iconSize: (25 + (feature.properties.Annual_Cap/2000))
    });
    var marker = L.marker(latlng,{icon: platformsIcon, pane: 'pane3'});
    marker.bindTooltip(feature.properties.Name, {permanent: true, opacity: 0.8, offset: [-15, 0], direction: 'left', className: 'tooltip'}).openTooltip();
    return marker;
  }
});
fullyardsTimeline.addTo(map);
slider.addTimelines(fullyardsTimeline);

var dynamicyardsTimeline = L.timeline(window.fulness, {
  pointToLayer: function(feature, latlng){
    var hue = feature.properties.full*40;
    return L.circleMarker(latlng, {
      color: "hsl(0, 100%, "+hue+"%)",
      fillColor: "hsl(0, 100%, "+hue+"%)",
      fillOpacity: 0.4,
      weight: 0,
      radius: (25+(feature.properties.Annual_Cap/2000))/2.25,
      pane: 'pane4'
    }).bindPopup(
      '<h3>'+ feature.properties.Name + '</h3>'+ '<br/>' +'<h4>' + 'Projected annual capacity: ' + '</h4>' + feature.properties.Annual_CaT + ',000 Te'+ '<br/>' + '<h4>' + 'Contact details: ' +'</h4>' +

      '<table>'+
      '<tr>'+
      '<td>'+ feature.properties.Contact + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+ feature.properties.Phone + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+ feature.properties.Email + '</td>'+
      '</tr>'+
      '</table>'

      + '<br/>' +'<h4>' + 'Quayside depth (min at low tide):' +'</h4>' + feature.properties.Quay_depth + '<br/>' +'<h4>' + 'Quayside Load-in Strength:' +'</h4>' + feature.properties.Quay_stren + '<br/>'+
      '<h4>' + 'Permits and licenses:' +'</h4>' +
      '<style>' + 'table {  width: 100%;} tr {} th { background-color: #cba;} td {  width: 30%; font: 11px/22px Titillium Web, Titillium Web, Titillium Web; height: 3px;  color: black;  background: transparent;}'  +'</style>'+


      '<table>'+
      '<tr>'+
      '<td>'+'Hydrocarbons' +'</td>'+
      '<td>'+ feature.properties.Hydrocarbo + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'PCBs'+'</td>'+
      '<td>'+ feature.properties.PCBS + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Production Chemicals' +'</td>'+
      '<td>'+ feature.properties.Chemicals + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Heavy metals'+'</td>'+
      '<td>'+ feature.properties.HeavyMetal + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Radioactive materials' +'</td>'+
      '<td>'+ feature.properties.Radioactiv + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Asbestos'+'</td>'+
      '<td>'+ feature.properties.Asbestos + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Metal' +'</td>'+
      '<td>'+ feature.properties.Metal + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Concrete and cement'+'</td>'+
      '<td>'+ feature.properties.Concrete + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Electrical cables'+'</td>'+
      '<td>'+ feature.properties.Electrical + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Plastics' +'</td>'+
      '<td>'+ feature.properties.Plastics + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'Wood'+'</td>'+
      '<td>'+ feature.properties.Wood + '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+'NORM' +'</td>'+
      '<td>'+ feature.properties.Norm + '</td>'+
      '</tr>'+
      '</table>'+
      '<h4>' + 'Information verified by site operator: ' + '</h4>' + feature.properties.Verified + '<h4>' + 'Additional information' + '</h4>' + ' .' );
    }
  });
  dynamicyardsTimeline.addTo(map);
  slider.addTimelines(dynamicyardsTimeline);


  var boundariesTimeline = L.timeline(window.borders, {pane: 'pane0', opacity: 0.3, dashArray: 5, weight: 1.5, dashOffset: 5
});
boundariesTimeline.addTo(map);
slider.addTimelines(boundariesTimeline);


var routesTimeline = L.timeline(window.routes, {pane: 'pane0', opacity: 0.5
});
routesTimeline.addTo(map);
slider.addTimelines(routesTimeline);

function updateList(timeline){
  var displayed = platformlistTimeline.getLayers();
  var list = document.getElementById('displayed-list');
  list.innerHTML = "";
  displayed.forEach(function(quake){
    var li = document.createElement('li');
    li.innerHTML = quake.feature.properties.Name;
    list.appendChild(li);
  });

  let currentDate = new Date(timeline.time);
  //let line = linePerYear[currentDate.getFullYear()];

  let toDisplay = Runner.getSummaryToDisplayForYear(currentDate.getFullYear() + "");
  if(toDisplay){
    document.getElementById("totalYardCapa").innerHTML = toDisplay.totalCapa.toLocaleString('en-US');
    document.getElementById("decoPlat").innerHTML = toDisplay.numProcessedPlatforms.toLocaleString('en-US');
    document.getElementById("decoTonnage").innerHTML = toDisplay.processedTonnage.toLocaleString('en-US');
    document.getElementById("spareCapa").innerHTML = toDisplay.spareCapa.toLocaleString('en-US');
  }
}

platformlistTimeline.on('change', function(e){
  updateList(e.target);
});
updateList(platformlistTimeline);
