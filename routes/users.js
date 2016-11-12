var User = require('../schema/user.js');

exports.save = function (req, res) {
  var args = req.body;
  User.findOne({ facebookId: args.facebookId }, function (err, user) {
    if (user) {
      res.send(user);
    } else {
      var newUser = new User({
        facebookId: args.facebookId,
        password: args.password,
        clubs: args.clubs,
      });

      newUser.save(function (err, newUser) {
        if (err) return console.error(err);
        res.send(newUser);
      });
    }
  });
};

exports.update = function (req, res) {
  var args = req.body;
  User.findOneAndUpdate({ facebookId: args.facebookId }, { clubs: args.clubs }, { new: true }, function (err, doc) {
    res.send(doc);
  });
};

exports.get = function (req, res) {
  User.find(function (err, users) {
    res.send(users);
  });
};

exports.getById = function (req, res) {
  User.find({ facebookId: req.params.facebookId }, function (err, users) {
    res.send(users);
  });
};

exports.removeById = function (req, res) {
  User.findOneAndRemove({ facebookId: req.params.facebookId }, function (err, users) {
    res.send(users);
  });
};
