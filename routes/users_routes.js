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
    res.json({msg: 'user created'});
  });
});

authRouter.get('/signin', basicHttp, function(req, res) {
  if (!(req.auth.username && req.auth.password)) {
    console.log('no basic auth provided');
    return res.status(401).json({msg: 'authenticat says no ... period'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('no basic auth providid');
      return res.status(401).json({msg: 'authenticat says talk to the hand'});
    }

    if (!user) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'authenticat says NOOOOO'});
    }

    if (!user.checkPassword(req.auth.password)) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'authenticat says no'});
    }

    res.json({msg: 'authentiCat has determined that you are you, but be warry because auth is tough'});
  });
});





//put in basicHttp on next line
// usersRouter.get('/signin', function(req, res) {
//   User.findOne({'basic.username': req.auth.username}, function(err, user) {
//     if (err) return handleError(err, res);

//     if(!user) {
//       console.log('could not authenticate: ' + req.auth.username);
//       return res.status(401).json({msg: 'could not authenticate'});
//     }

//     user.comapreHash(req.auth.password, function(err, hashRes) {
//       if (err) return handleError(err, res);
//       if (!hashRes) {
//         console.log('could not authenticate: ' + req.auth.username);
//         return res.status(401).json({msg: 'authenticat says NO!'});
//       }

//       user.generateToken(function(err, toaken) {
//         if (err) return handleError(err, res);
//         res.json({token: token});
//       });
//     });
//   });
// });




// This code may be useful for user manipulation
// usersRouter.get('/users', function(req, res) {
//   User.find({}, function(err, data) {
//     if (err) return handleError(err, res);

//     res.json(data);
//   });
// });

// usersRouter.post('/users', jsonParser.json(), function(req, res) {
//   var newUser = new User(req.body);
//   newUser.save(function(err, data) {
//     if (err) return handleError(err, res);

//     res.json(data);
//   });
// });

// usersRouter.put('/users/:id', jsonParser.json(), function(req, res) {
//   var userData = req.body;
//   delete userData._id;
//   User.update({_id: req.params.id}, userData, function(err) {
//     if (err) return handleError(err, res);

//     res.json({msg: 'successfully updated a user!'});
//   });
// });

// usersRouter.delete('/users/:id', function(req, res) {
//   User.remove({_id: req.params.id}, function(err) {
//     if (err) return handleError(err, res);

//     res.json({msg: 'You successfully deleted a user!'});
//   });
// });
