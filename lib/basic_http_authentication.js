module.exports = function(req, res, next) {
  try {
    var basicBuffer = new Buffer(req.headers.authorization.split(' ')[1], 'base64');
    var authArray = basicBuffer.toString().split(':');
    req.auth = {
      username: authArray[0],
      password: authArray[1]
    };
    next();
  } catch(e) {
    console.log(e);
    return res.status(401).json({msg: 'access denied'});
  }
};
