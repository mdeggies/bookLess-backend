'use strict';
var db = require ('./models');
var express = require('express'),
cors = require('cors'), app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(express.methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// development only
/*if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}*/

app.use('/api', require('./routes/api/'));

db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ', app.get('port'));
  });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(err.status || 500);
  console.log('Error:', err);
});

//module.exports = app;
