'use strict';

var models  = require('../../models/index');
var express = require('express');
var router = express.Router();
var aws = require("aws-lib");

router.get('/', function(req, res, next) {
  console.log('in .get /');
  res.send('sent');
})

router.post('/', function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  var fb_id = Object.keys(req.body)[0];
  models.User.sync().then(function() {
    models.User.findOrCreate({
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

router.post('/wishlist', function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  console.log('req.body backend',JSON.stringify(Object.keys(req.body)[0]));
  /*models.User.sync().then(function() {
    models.User.find({
      where: {
        fb_id: fb_id,
      },*/
      res.send('sent');
});

router.post('/bookImgs', function(req, res, next) {
  var categories = Object.keys(req.body)[0];
  console.log('categories in /books post:',categories);
  var prodAdv = aws.createProdAdvClient('AKIAJBWL3ALKLCA2MOAA', 'sHHyuR5XgeacDEtee7Pv7NE8Ivly3iQjCAi58rYq', 'Michele Degges');
  var options = {SearchIndex: "Books", Keywords: "Scifi", Sort: "relevancerank", Operation: "SimilarityLookup", SimilarityType: "Intersection", ResponseGroup: "Images"};
  prodAdv.call("ItemSearch", options, function(err, result) {
    if (err) return res.sendStatus(400);
    res.send(result.Items.Item);
  });
});

router.post('/bookDetails', function(req, res, next) {
  var categories = Object.keys(req.body)[0];
  var prodAdv = aws.createProdAdvClient('AKIAJBWL3ALKLCA2MOAA', 'sHHyuR5XgeacDEtee7Pv7NE8Ivly3iQjCAi58rYq', 'Michele Degges');
  var options = {SearchIndex: "Books", Keywords: "Scifi", Sort: "relevancerank", Operation: "SimilarityLookup", SimilarityType: "Intersection"};
  prodAdv.call("ItemSearch", options, function(err, result) {
    if (err) return res.sendStatus(400);
    res.send(result.Items.Item);
  });
});

router.get('/books', function(req, res, next) {

});

router.post('/books/reviews', function(req, res, next) {
  var categories = Object.keys(req.body)[0];
  console.log('categories in /books/reviews post:',categories);
  var prodAdv = aws.createProdAdvClient('AKIAJBWL3ALKLCA2MOAA', 'sHHyuR5XgeacDEtee7Pv7NE8Ivly3iQjCAi58rYq', 'Michele Degges');
  var options = {SearchIndex: "Books", Keywords: "Scifi", Sort: "relevancerank", Operation: "SimilarityLookup", SimilarityType: "Intersection", ResponseGroup: "Reviews", TruncateReviewsAt: "256", ItemPage: "10"};
  prodAdv.call("ItemSearch", options, function(err, result) {
    if (err) return res.sendStatus(400);
    res.send(result.Items.Item);
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
