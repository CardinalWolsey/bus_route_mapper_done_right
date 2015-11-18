window.onload = function() {

  var routeDup = new Set();
  var layerArray = [];

  function getNearBusRoutes(radius) {
    $.ajax ({
      url: 'http://localhost:3000/api/nearbusroutes/' ,
      type: 'GET',
      data: {
        lng: lng,
        lat: lat,
        radius: radius
      }
    })
    .done(function(res) {
      console.log('done');
      for (var i = 0; i < res.length; i++) {
        var fullRouteNum = res[i].properties.ROUTE;
        if (!routeDup.has(fullRouteNum)) {
          routeDup.add(fullRouteNum);

          //makes layer on map
          geojson = L.geoJson(res[i], {
            style: style,
            onEachFeature: onEachFeature
            // zoomToFeature
          }).addTo(map).bindPopup(fullRouteNum);
          layerArray.push(geojson);

          $('#selected-routes').append('<button id="route-number" class="' +  fullRouteNum + '">' + fullRouteNum + '</button>')
        }

      }
    })
    .fail(function(err) {
      console.log(err);
    });
  }

  //User inputs route number and map displays paths
  $('#route-submit').on('click', function(e) {
    e.preventDefault();
    var routeNum = $('#input-route').val();
    console.log('it clicked');
    $.ajax({
        url: 'http://localhost:3000/api/busroutes/' + routeNum,
        method: 'GET',
    })
    .done(function(res) {
      for (var i = 0; i < res.length; i++) {
        var fullRouteNum = res[i].properties.ROUTE;
        if (!routeDup.has(fullRouteNum)) {
          routeDup.add(fullRouteNum);

          //makes layer on map
          geojson = L.geoJson(res[i], {
            style: style,
            onEachFeature: onEachFeature
            // zoomToFeature
          }).addTo(map).bindPopup(fullRouteNum);
          layerArray.push(geojson);

          $('#selected-routes').append('<button id="route-number" class="' +  fullRouteNum + '">' + fullRouteNum + '</button>')
        }
      };
    });
  });

  //clears all layered routes
  $('#clear-routes').on('click', function(e) {
    e.preventDefault();
    routeDup.clear()
    layerArray.forEach(function(element, index, array) {
      array[index].clearLayers();
    });
    layerArray.length = 0;
    $('#selected-routes').empty();
  });

  $('#map').on('click', '#nearButton', function() {
    console.log('button clicked!');
    getNearBusRoutes(200);
  });

};
