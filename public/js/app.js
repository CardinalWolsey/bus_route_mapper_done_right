window.onload = function() {

  var routeDup = new Set();

  var layerArray = [];
  // var color = require(__dirname + '/../../lib/bus_color');


  // var color  = [
  //   {"color": "#00FFEA"},
  //   {"color": "#00BDE8"},
  //   {"color": "#008DFF"},
  //   {"color": "#0044E8"},
  //   {"color": "#0007FF"}
  // ];


  // console.log(color)


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
      console.log('response from database recieved');

      var responseRoutes = res;

      for (var i = 0; i < responseRoutes.length; i++) {
        var fullRouteNum = responseRoutes[i].properties.ROUTE;
        if (!routeDup.has(fullRouteNum)) {
          routeDup.add(fullRouteNum);

          //makes layer on map
          geojson = L.geoJson(responseRoutes[i], {
            style: style,
            onEachFeature: onEachFeature
          }).addTo(map).bindPopup(fullRouteNum);

          layerArray.push(geojson);
          $('#selected-routes').append('<li id="route-number" class="' +  fullRouteNum + '">' + fullRouteNum + '</li>')
        }

        // sets view
        // map.remove();
        // var map = L.map('map').setView(fullRouteNum.geometry.coordinates);
      };


      console.log(layerArray);
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

  // $('#selected-routes:number').on('click', function(e) {
  //   e.preventDefault();
  //   console.log('clicked to remove');
  //   $.ajax({
  //       url: 'http://localhost:3000/api/busroutes/' + routeNum,
  //       method: 'GET',
  //   })
  //   .done(function(res) {
  //     console.log('response from database recieved');
  //     var responseRoutes = res;
  //     for (var i = 0; i < responseRoutes.length; i++) {
  //       L.geoJson(responseRoutes[i]).addTo(map).bindPopup(responseRoutes[i].properties.ROUTE);

  //       console.log(responseRoutes[i]);
  //       $('#selected-routes').append('<button>' + responseRoutes[i].properties.ROUTE + '</button>')
  //     };

  //     // showRoutes(responseRoutes);
  //     // responseRoutes.forEach(route) {
  //     // }
  //   });

  // });


};
