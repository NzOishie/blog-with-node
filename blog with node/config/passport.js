var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){

    passport.use(new LocalStrategy(function(user_name, password, done){
        // Match Username
        console.log("hkvjf");
        let query = {user_name:user_name};
        User.findOne(query, function(err, user){
            //if(err) throw err;
            console.log(user);
            if(!user){
                return done(null, false, {message: 'No user found'});
            }

            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));
    //serializer
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    //desirializer
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
