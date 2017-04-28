var express = require('express');
var bodyParser = require('body-parser');

var busRoute = require(__dirname + '/../models/busRoute');
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var busRouter = module.exports = exports = express.Router();

busRouter.post('/busroutes', bodyParser.json({limit: '5mb'}), eatAuth, function(req, res) {
  var newBusRoute = new busRoute(req.body);
  newBusRoute.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

busRouter.get('/busroutes/:route_num', function(req, res) {
  busRoute.find({"properties.RTE_NUM": req.params.route_num}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

busRouter.put('/busroutes/:id', bodyParser.json(), eatAuth, function(req, res) {
  var busRouteData = req.body;
  delete busRouteData._id;
  busRoute.update({_id: req.params.id}, busRouteData, function(err) {
      if (err) return handleError(err, res);

      res.json({msg: 'successfully updated route'});
  });
});


busRouter.delete('/busroutes/:id', bodyParser.json(), eatAuth, function(req, res) {
  busRoute.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'successfully deleted route'});
  });
});

//weigh pros and cons of doing this with a query string
busRouter.get('/nearbusroutes/', function(req, res) {
  var lng = Number(req.query.lng);
  var lat = Number(req.query.lat);
  var radius = Number(req.query.radius);
  busRoute.find({geometry: { $near: {$geometry: {type: "Point", coordinates: [lng, lat]}, $maxDistance: radius}}}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});
