window.onload = function() {

  var routeDup = new Set();


  // var color = require(__dirname + '/../../lib/bus_color');
  // var newColor  = [
  //   {"color": "#FF0000"},
  //   {"color": "#FFFF00"},
  //   {"color": "#2FDE00"},
  //   {"color": "#0000BF"},
  //   {"color": "#210026"}
  // ];

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
    var routeNum = $('#route-number').val();
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


          // ids = responseRoutes[i]._id;

          //makes layer on map
          geojson = L.geoJson(responseRoutes[i], {
            style: style,
            onEachFeature: onEachFeature
          }).addTo(map).bindPopup(fullRouteNum);

          $('#selected-routes').append('<button>' + fullRouteNum + '</button>')
          console.log(responseRoutes[i]);
        }

        // sets view
        // map.remove();
        // var map = L.map('map').setView(fullRouteNum.geometry.coordinates);
      };


      // showRoutes(responseRoutes);
      // responseRoutes.forEach(route) {
      // }
    });
  });

  // //should clears all layered routes
  // $('#clear-routes').on('click', function(e) {
  //   e.preventDefault();
  //   L.geoJson().removeLayer("564a19c90fcfdd7cda9fd0f3");
  //   console.log('remove layer');
  // });

  // $('#selected-routes').on('click', function(e) {
  //   e.preventDefault();
  //   console.log('it clicked');
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


// L.geoJson(geojsonFeature, {
//     onEachFeature: onEachFeature
// }).addTo(map);



};
