var mongoose = require('mongoose');
var express = require('express');
var app = express();


app.listen(process.env.PORT || 3000, function() {
  console.log('server running');
})
