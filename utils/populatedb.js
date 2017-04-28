var fs = require('fs');
var request = require('superagent');

var routesCollection = JSON.parse(fs.readFileSync(__dirname +
  '/../bus_routes.geojson'));

for (var i = 0; i < routesCollection.features.length; i++) {
  result = {};
  result.ROUTE = routesCollection.features[i].properties.ROUTE;
  result.RTE_NUM = routesCollection.features[i].properties.RTE_NUM;
  result.RTE_PART = routesCollection.features[i].properties.RTE_PART;
  result.SVC_TYPE = routesCollection.features[i].properties.SVC_TYPE;
  result.Shape_len = routesCollection.features[i].properties.Shape_len;
  var geometry = routesCollection.features[i].geometry;

  var structuredObject = {
    properties: result,
    geometry: geometry
  }

  request
    .post('http://localhost:3000/api/busroutes/')
    .send(structuredObject)
    .end();
}
