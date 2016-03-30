'use strict';

var express = require('express'), cors = require('cors'), app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var debug = require('debug')('bookLess:server');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'www')));
app.use(cors());

app.use('/api', require('./routes/index'));
/*app.all('/*', function(req, res) {
  res.render('index');
});*/

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(err.status || 500);
  console.log('Error:', err);
  /*res.render('error', {
    message: err.message,
    error: err
  });*/
});

module.exports = app;
