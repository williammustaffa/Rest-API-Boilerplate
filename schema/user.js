var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* User definition */
var userSchema = Schema({
  facebookId: String,
  password: String,
  clubs: [Schema.Types.Mixed],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
