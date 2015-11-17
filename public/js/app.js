window.onload = function() {

  // function getRoutesData (routeNum) {
  //   $.get('localhost:3000/api/busroutes/' + routeNum)
  // }


  // function getRoutesData (routeNum) {
  //   $.ajax({
  //     url:'localhost:3000/api/busroutes/' + routeNum,
  //     method: 'GET'
  //   })

  //   .done(function(res) {
  //     console.log(res)
  //     // array = array of objects
  //     var array = [];
  //     // res.data
  //     console.log(res.data)
  //     // res.forEach()

  //   })
  // }

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
      responseRoutes = res;
      console.log(responseRoutes[0]);
      L.geoJson(responseRoutes[0]).addTo(map);
    });

  });


// L.geoJson(geojsonFeature, {
//     onEachFeature: onEachFeature
// }).addTo(map);



};
