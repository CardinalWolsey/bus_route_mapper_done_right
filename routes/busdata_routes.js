var express = require('express');
var bodyParser = require('body-parser');

// TODO how do we make a model from our geojson data?
var busRoute = require(__dirname + '/../models/busRoute');

var handleError = require(__dirname + '/../lib/handleServerError');

var busRouter = module.exports = exports = express.Router();

busRouter.post('/busroutes', bodyParser.json(), function(req, res) {
  console.log('post request recieved');
  var newBusRoute = new busRoute(req.body);
  newBusRoute.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

busRouter.get('/busroutes/:route_num', function(req, res) {
  busRoute.find({"properties.RTE_NUM":req.params.route_num}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});
