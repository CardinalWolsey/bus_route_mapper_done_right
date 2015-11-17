var mongoose = require('mongoose');
var express = require('express');
var app = express();
var busRouter = require(__dirname + '/routes/busdata_routes');
var authRouter = require(__dirname + '/routes/users_routes');

mongoose.connect('mongodb://localhost/busData');
// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

app.use('/api', busRouter);
app.use('/api', authRouter)

app.listen(3000, function() {
  console.log('server listening on port 3000');
});
