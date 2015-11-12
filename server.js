var mongoose = require('mongoose');
var express = require('express');
var app = express();
var busRoutes = require(__dirname + '/routes/router');

mongoose.connect('mongodb://localhost/'); //TODO insert path to db

app.use('/api', busRoutes);

app.listen(3000, function() {
  console.log('server listening on port 3000');
});
