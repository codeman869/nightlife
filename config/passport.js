'use strict'
const mongoose = require('mongoose');
const twitter = require('./passport/twitter');

const User = mongoose.model('User');

module.exports = function(passport) {
    
    //passport.initialize();
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('twitter', twitter);
    
}