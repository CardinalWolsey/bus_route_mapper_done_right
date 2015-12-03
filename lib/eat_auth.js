var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.headers.token || (req.body)? req.body.token : '';
    if (!token) {
      console.log('no token');
      return res.status(401).json({msg: 'authentiCat seyzzz noe, and is watching you!!!'});
    }

  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'authentiCat sayszzzz noe!!!'});
    }

    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'authentiCat seyzzz noe!!!!'});
      }

      if (!user) {
        console.log(err);
        return res.status(401).json({msg: 'authentiCat seyzzz noe!!!!!'});
      }

      req.user = user;
      next();
    });
  });
};
