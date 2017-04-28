var mongoose = require('mongoose');
var express = require('express');
var app = express();
var busRoutes = require(__dirname + '/routes/busdata_routes');
var authRoutes = require(__dirname + '/routes/users_routes');

process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/busData');
process.env.PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/build'));

app.use('/api', busRoutes);
app.use('/api', authRoutes);

app.listen(process.env.PORT, function() {
  console.log('server is up and listening on port ' + process.env.PORT);
});
