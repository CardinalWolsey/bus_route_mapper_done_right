//TODO: update file


var express = require('express');
var bodyParser = require('body-parser');

var busRoute = require(__dirname + '/../models/busRoute');

var handleError = require(__dirname + '/../lib/handleServerError');

var eatAuth = require(__dirname + '/../lib/eat_auth');

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
  console.log('get single route request recieved');
  busRoute.find({"properties.RTE_NUM":req.params.route_num}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

busRouter.put('/busroutes/:id', bodyParser.json(), eatAuth, function(req, res) {
  var busRouteData = req.body;
  delete busRouteData._id;
  busRoute.update({_id: req.params.id}, busRouteData, function(err) {
      if (err) return handleError(err, res);

      res.json({msg: 'successfully updated route with put method'});
  });
});


busRouter.delete('/busroutes/:id', bodyParser.json(), eatAuth, function(req, res) {
  busRoute.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    console.log('route ' + req.params.id + ' deleted.');
    res.json({msg: 'successfully deleted route with delete method'});
  });
});

busRouter.get('/nearbusroutes/', function(req, res) {
  console.log('near request received ');
  var lng = Number(req.query.lng);
  var lat = Number(req.query.lat);
  var radius = Number(req.query.radius);
  console.log("Long, lat, radius : " + lng + ", " + lat + ", " + radius);
  busRoute.find({geometry: { $near: {$geometry: {type: "Point", coordinates: [lng, lat]}, $maxDistance: radius}}}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});


// db.routes.find( { geometry:{ $near: { $geometry: { type: "Point", coordinates: [-122.31, 47.6244] }, $maxDistance: 1000 } } },{geometry: 0} ).limit(2).pretty()
