var config = require('../config.js');
var jwt = require('jsonwebtoken');
var User = require('../schema/user.js');

exports.check = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};

exports.generate = function (req, res) {
  User.findOne({ facebookId: req.params.facebookId }, function (err, user) {
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      /*
       * This is not very effective now
       * This should use a password here
       * So we would compare and return the token
       */

      var token = jwt.sign(user, config.secret, {
        expiresIn: 1440,
      });
      res.json({
        success: true,
        token: token,
      });
    }
  });
};
