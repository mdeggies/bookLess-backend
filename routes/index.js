'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');//(sequelize);

router.get('/', function(req, res, next) {
  console.log('in .get /', req.body);
  res.send('sent');
})

router.post('/', function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  var fb_id = Object.keys(req.body)[0];
  User.sync().then(function() {
    User.findOrCreate({
      where: {
        fb_id: fb_id,
      },
      defaults: { // set the default properties if it doesn't exist
      fb_id: fb_id,
      book_wishlist: []
     }
   }).then(function(result) {
      var user = result[0], // the instance of the user
      created = result[1]; // boolean stating if it was created or not
      if (created) {
        console.log('New user created'); //true
      }
      else {
        console.log('User already exists'); //false
      }
      res.send(created);
    });
  });
});

router.get('/categories', function(req, res, next) {
  console.log('in .get /categories', req.body);
  res.render('categories');
})

router.get('/home', function(req, res, next) {
  console.log('in .get /home', req.body);
  res.render('home');
});

router.get('/profile', function(req, res, next) {
  console.log('in .get /profile', req.body);
  res.render('profile');
});


module.exports = router;
