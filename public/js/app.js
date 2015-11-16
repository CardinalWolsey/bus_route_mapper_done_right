window.onload = function() {

var routeNum = 0;
  $('#route-submit').on('click', function(e) {
    e.preventDefault();
    routeNum = $('#route-number').val();
    console.log('it clicked');

  console.log(routeNum);
  })

// var getRoutesData = function (routeNum) {
//   $.ajax({
//     url:'localhost:3000/api/busroutes/' + routeNum,
//     method: 'GET'
//   })

//   .done(function(res) {
//     //array = array of objects
//     var array = res.data
//     res.forEach()

//   })

// }

// L.geoJson(geojsonFeature, {
//     onEachFeature: onEachFeature
// }).addTo(map);



}
