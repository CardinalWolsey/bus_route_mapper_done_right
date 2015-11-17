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
    $.get('localhost:3000/api/busroutes/' + routeNum, function(data) {
      console.log(data);
    })

    // getRoutesData(routeNum);

    // console.log(routeNum);
  })


// L.geoJson(geojsonFeature, {
//     onEachFeature: onEachFeature
// }).addTo(map);



}
