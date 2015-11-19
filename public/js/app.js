window.onload = function() {

  var routeDup = new Set();
  var layerArray = [];

  //runs the .done part of an ajax request
  function ajaxDone (res) {
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

        $('#selected-routes').append('<button id="route-number" class="' +  fullRouteNum + '">' + fullRouteNum + '</button>');
      };
    };
  };

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
      ajaxDone(res)
    })
    .fail(function(err) {
      console.log(err);
    });
  }

  //User inputs route number and map displays paths
  $('#route-submit').on('click', function(e) {
    e.preventDefault();
    var routeNum = $('#input-route').val();
    $.ajax({
        url: 'http://localhost:3000/api/busroutes/' + routeNum,
        method: 'GET',
    })
    .done(function(res) {
      ajaxDone(res);
    })
    .fail(function(err) {
      console.log(err);
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
