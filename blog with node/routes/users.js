var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user.js');
let Blog = require('../models/blog.js');

//Sign Up
router.get('/signup', function(req, res, next) {
  res.render('sign-up');
});

router.post('/signup', function(req, res, next) {

  const name= req.body.name;
  const email=req.body.email;
  const role= req.body.role;
  const user_name = req.body.user_name;
  const password = req.body.password;

  let newUser = new User({
    name: name,
    email: email,
    role: role,
    user_name: user_name,
    password: password
  });
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      if(err){
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(function(err){
        if(err){
          console.log(err);
        } else {
          res.redirect('/users/login');
        }
      });
    });
  });

});

// Login Form
router.get('/login', function(req, res){
  res.render('log-in');
});


router.post('/login', function(req, res){
  var user_name = req.body.user_name;
  var password = req.body.password;
  User.findOne({ user_name: user_name }, function (err, user) {
    console.log(user);
    if (err) {
      console.log(err);
    } else if (!user) {
      var err = new Error('User not found.');
      res.status(404).send();
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {

        req.session.user = user;
        res.redirect('/');

      } else {
        console.log("password not matched");
      }
    })
  });
  })

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
