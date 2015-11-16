// var fs = require('fs');
var request = require('superagent');

// var routesCollection = JSON.parse(fs.readFileSync(__dirname +
  // '/../data/routes/TEST_routes_multi.geojson'));
  // '/../data/routes/routes_split.geojson'));

var features = require(__dirname + '/../data/routes/TEST_routes_multi.geojson');
// console.log(routesCollection);

console.log(features[0].geometry);
console.log(features[0].properties.ROUTE);


for (var i = 0; i < features.length; i++) {
  result = {};
  result.ROUTE = features[i].properties.ROUTE;
  result.RTE_NUM = features[i].properties.RTE_NUM;
  result.RTE_PART = features[i].properties.RTE_PART;
  result.SVC_TYPE = features[i].properties.SVC_TYPE;
  result.Shape_len = features[i].properties.Shape_len;
  result.geometry = features[i].geometry;
  request
    .post('http://localhost:3000/api/busroutes/')
    .send(result)
    // .end(function(err, res) {
    //   if (err) console.log(err);
    .end();


}


// request
//   .post('/api/pet')
//   .send({ name: 'Manny', species: 'cat' })
//   .set('X-API-Key', 'foobar')
//   .set('Accept', 'application/json')
//   .end(function(err, res){
//     // Calling the end function will send the request
//   });
