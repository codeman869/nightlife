'use strict'
const express = require('express');
const session = require('express-session')
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

/**
 * Expose
 */

module.exports = function(app,passport) {
    /*
    app.get('/', (req,res) => {
        
        res.send(200);
        
    });
    */
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(session({
       secret: process.env.appSecret || 'catsareawesome',
       resave: false,
       saveUninitialized: true
    }))
    
    app.use(passport.initialize());
    
    
    
    
    
    
}