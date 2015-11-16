var mongoose = require('mongoose');
var express = require('express');
var app = express();
var busRoutes = require(__dirname + '/routes/busdata_routes');

mongoose.connect('mongodb://localhost/busData');

app.use('/api', busRoutes);

app.listen(3000, function() {
  console.log('server listening on port 3000');
});
