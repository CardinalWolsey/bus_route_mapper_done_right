var mongoose = require('mongoose');
var express = require('express');
var app = express();
var busRoutes = require(__dirname + '/routes/busdata_routes');
var usersRoutes = require(__dirname + 'routes/users_routes');

mongoose.connect('mongodb://localhost/busData');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users');

app.use('/api', busRoutes);
app.use('/api', usersRoutes)

app.listen(3000, function() {
  console.log('server listening on port 3000');
});
