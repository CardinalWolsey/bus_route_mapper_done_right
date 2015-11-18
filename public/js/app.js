window.onload = function() {

  var routeDup = new Set();
  var layerArray = [];

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

};
