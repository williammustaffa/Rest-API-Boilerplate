var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var apiRoutes = express.Router();
var morgan = require('morgan');

/* database imports */
var mongoose = require('mongoose');
var users = require('./routes/users');
var auth = require('./routes/authentication');

var config = require('./config.js');
var APP_PORT = process.env.PORT || 3000;

/* Connect to mongodb */
mongoose.connect(config.database);

/* json body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

/* Use morgan to log requests */
app.use(morgan('dev'));

/* allow origin */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* Endpoints */
apiRoutes.post('/users', users.save);
apiRoutes.put('/users', auth.check, users.update);
apiRoutes.get('/users', users.get);
apiRoutes.get('/getToken/:facebookId', auth.generate);
apiRoutes.get('/users/:facebookId', auth.check, users.getById);
apiRoutes.delete('/users/:facebookId', auth.check, users.removeById);

/* Common api endpoint */
app.use('/rest/api/v1', apiRoutes);

/* Serving */
app.listen(APP_PORT);
console.log('API running at port: ' + APP_PORT);
