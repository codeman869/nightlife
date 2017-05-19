'use strict'
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = new TwitterStrategy({
   
   consumerKey: process.env.twitterAPI || 'supersecretkey',
   consumerSecret: process.env.twitterSecret || 'supersecretkey',
   callbackURL: process.env.twitterCB || '/a/random/callback'
    
}, (token, tokenSecret, profile, done) => {
    
    console.log(token);
    console.log(tokenSecret);
    console.log(profile);
    
    User.findOrCreate(profile.username, 'twitter', (err,user) => {
        
        if(err) return done(err);
        
        return done(null,user);
        
    });
    
});