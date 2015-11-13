var mongoose = require('mongoose');
var express = require('express');
var app = express();
var playerRouter = require(__dirname + '/routes/player_routes');

// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mlb_player')

// app.use('/api', playerRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running');
})
