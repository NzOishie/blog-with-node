var express = require('express');
var router = express.Router();
const session = require('express-session');


let Blog = require('../models/blog.js');
let User = require('../models/user.js');

/* GET home page. */
router.get ('/', function(req, res, next) {
  Blog.find({},function (err,blogs) {
   if(err){
     console.log(err)
   }
   else{
       console.log(req.session.user);
   var isLoggedIn = req.session.user ? true : false;
   console.log(isLoggedIn);
     res.render('index', {
       isLoggedIn: isLoggedIn,
       blogs : blogs });
   }
  });
});




router.get('/blogs/add',requiresLoginCreate,function (req,res,next) {
  res.render('add');
});
//Single blog
router.get('/blog/:id',function (req,res,next) {
    Blog.findById(req.params.id,function (err,blog) {
        res.render('blog-view',{
            blog:blog
        });
    });
});
//Edit blog
router.get('/blog/edit/:id',requiresLoginEdit, function (req,res,next) {
    Blog.findById(req.params.id,function (err,blog) {
        res.render('edit',{
            blog:blog
        });
    });
});

function requiresLoginCreate(req, res, next) {

    if (req.session && req.session.user && req.session.user.role ==='User') {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

function requiresLoginEdit(req, res, next) {

    if (req.session && req.session.user && req.session.user.role ==='Agent') {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

router.post('/blogs/add',requiresLoginCreate,function (req,res,next) {
  let blog = new Blog();
  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.body = req.body.author;

    blog.save(function (err,blogs) {
        if(err){
            console.log(err)
        }
        else {
            res.redirect('/');
        }
    });


});
module.exports = router;
