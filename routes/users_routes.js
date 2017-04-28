var express = require('express');
var jsonParser = require('body-parser').json();

var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleServerError');
var basicHttp = require(__dirname + '/../lib/basic_http_authentication');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, function(req, res) {
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password);

  user.save(function(err, data) {
    if (err) return handleError(err, res);

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);

      res.json({token: token});
    });
  });
});

authRouter.get('/signin', basicHttp, function(req, res) {
  if (!(req.auth.username && req.auth.password)) {
    console.log('username or password not included');
    return res.status(401).json({msg: 'Access denied.'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('database error');
      return res.status(401).json({msg: 'Access denied.'});
    }

    if (!user) {
      console.log('username does not exist');
      return res.status(401).json({msg: 'Access denied.'});
    }

    if (!user.checkPassword(req.auth.password)) {
      console.log('incorrect password');
      return res.status(401).json({msg: 'Access denied.'});
    }

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);

      res.json({token: token});
    });
  });
});
