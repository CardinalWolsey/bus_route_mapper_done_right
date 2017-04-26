//TODO: update file


var fs = require('fs');
var request = require('superagent');

var routesCollection = JSON.parse(fs.readFileSync(__dirname +
  '/../bus_routes.geojson'));
  // '/../data/routes/routes_split.geojson'));

// console.log(routesCollection.features[0]);
// this is what I will use ...
// routesCollection.features.length

// var file = require(__dirname + '/../bus_routes.geojson');
// console.log(routesCollection);

// console.log(file);
// console.log(features[0].geometry);
// console.log(features[0].properties.ROUTE);


for (var i = 0; i < routesCollection.features.length; i++) {
  result = {};
  result.ROUTE = routesCollection.features[i].properties.ROUTE;
  result.RTE_NUM = routesCollection.features[i].properties.RTE_NUM;
  result.RTE_PART = routesCollection.features[i].properties.RTE_PART;
  result.SVC_TYPE = routesCollection.features[i].properties.SVC_TYPE;
  result.Shape_len = routesCollection.features[i].properties.Shape_len;
  var geometry = routesCollection.features[i].geometry;
  structuredObject = {
    properties: result,
    geometry: geometry
  }
  console.log(structuredObject);
  request
    .post('http://localhost:3000/api/busroutes/')
    .send(structuredObject)
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
