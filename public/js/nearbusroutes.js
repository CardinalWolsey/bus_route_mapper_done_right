// $('#route-submit').on('click', function(e) {
//   e.preventDefault();



$(document).ready(function(){
  var lng;
  var lat;

  function onMapClick(e) {
    lng = e.latlng.lng;
    lat = e.latlng.lat;
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked at " + e.latlng.toString() +
        "\n <button id='nearButton' type='button' data-lng='" +
        e.latlng.lng.toString() + "' data-lat='" + e.latlng.lat.toString() + "' >Nearby Routes</button>")
      .openOn(map);
  }

  map.on('click', onMapClick);

  // $('#map').on('click', '.trigger', function() {
  //     alert('Hello from Toronto!');
  // });

  $('#map').on('click', '#nearButton', function() {
    console.log('button clicked!');
    getNearBusRoutes(200);

  });

function getNearBusRoutes(radius) {
  $.ajax ({
    url: 'http://localhost:3000/api/nearbusroutes/',
    type: 'GET',
    data: {
      lng: lng,
      lat: lat,
      radius: radius
    }
  })
  .done(function(res) {
    for (var i = 0; i < res.length; i++) {
      mapDisplay(res[i]);
    }
  })
  .fail(function(err) {
    console.log(err);
  });
}

function mapDisplay(route) {
  L.geoJson(route, {
    onEachFeature: onEachFeature
  }).addTo(map);
}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.ROUTE) {
        layer.bindPopup(feature.properties.ROUTE);
    }
}

});
