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

//for eventlisteners to use
var geojson;

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
  // popup
    // .setLatLng(e.latlng)
    // .setContent("You clicked at " + e.latlng.toString())
    // .openOn(map);
}

map.on('click', onMapClick);



function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


var busColor = [
  '#FF0000',//red
  '#FFFF00',//yellow
  '#2FDE00',//lime green
  '#0000BF',//blue
  '#4B2E83', //dark purple
  '#210026', //purple
];

var newColor  = [
  {inUse: false, "color": "#FF0000"},
  {inUse: false, "color": "#FFFF00"},
  {inUse: false, "color": "#2FDE00"},
  {inUse: false, "color": "#0000BF"},
  {inUse: false, "color": "#210026"}
];

// function chooseColor (colorArray) {
//   for (var i = 0; i < colorArray.length; i++) {
//     if (colorArray[i].inUse === false) {
//       colorArray[i].inUse = true;
//       return colorArray[i].color;
//     }
//   };
//   return "#000000";
// }

// function(color) {
//   for (var i = 0; i < colorArray.length; i++) {
//     if (this.colorArray[i].color == color) {
//       this.colorArray[i].inUse = false;
//     }
//   };
// }


// //gets random color from bus color palette
// function style() {
//     return {
//         color: busColor[getRandom(0, busColor.length)],
//         weight: 4,
//         opacity: 1,
//         fillOpacity: 0.7
//     };
// }

function style() {
    return {
        // color: chooseColor(newColor),
        weight: 4,
        opacity: 1,
        fillOpacity: 0.7
    };
}


//to highlight hovered route
function highlightRoute(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 7,
        color: busColor[getRandom(0, busColor.length)],
        // color: '#4B2E83',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

//resets after finished hovering
function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

//zooms in or out depending on the selected route
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightRoute,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}


// L.geoJson(geojsonFeature).addTo(map);

//for geojson data to be added
// var myLayer = L.geoJson().addTo(map);
// myLayer.addData(geojsonFeature);

