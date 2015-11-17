var map = L.map('map');

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibXJpbmdlbCIsImEiOiJjaWd5bmljcm4wdmk2dmttNXg1ZGd3ODM5In0.GbAVcFSt6FWimnWc0XvsLw', {
//   maxZoom: 18,
//   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//   id: 'mapbox.emerald'
// }).addTo(map);

// Use this code for ugly map tiles straight from OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);

//finds and centers where current location is
function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from here").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

//returns an alert if location was not found
function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 13});

//able to make circle
L.circle([51.508, -0.11], 500, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5
}) // .addTo(map).bindPopup("I am a circle.");

//able to make polygon
L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047]
])// .addTo(map).bindPopup("I am a polygon.");

var popup = L.popup();

//popup shows location via where clicked
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);

L.geoJson(geojsonFeature).addTo(map);

//for geojson data to be added
// var myLayer = L.geoJson().addTo(map);
// myLayer.addData(geojsonFeature);

