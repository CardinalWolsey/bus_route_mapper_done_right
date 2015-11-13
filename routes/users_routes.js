var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleServerError');

var usersRouter = module.exports = exports = express.Router();

usersRouter.get('/users', function(req, res) {
  User.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

usersRouter.post('/users', bodyParser.json(), function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

usersRouter.put('/users/:id', bodyParser.json(), function(req, res) {
  var userData = req.body;
  delete userData._id;
  User.update({_id: req.params.id}, userData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'successfully updated a user!'});
  });
});

usersRouter.delete('/users/:id', function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'You successfully deleted a user!'});
  });
});
