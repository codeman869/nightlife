'use strict'
const express = require('express');
const Api = require('../app/controllers/api');

let session = express.session({
    secret: process.env.expressSecret || 'cats are awesome'
});

/**
 * Expose
 */


module.exports = function(app,passport) {
    
    app.use('/', express.static('./public'));
       
    app.get('/api/v1', Api.main);
    
    app.get('/api/v1/business', Api.getBusinesses);
    
    app.get('/auth/twitter', session, passport.authenticate('twitter', {session: false}));
    
    app.get('/auth/twitter/callback', session, passport.authenticate('twitter', { 
        successRedirect: '/',
        failureRedirect: '/api/v1'
    }));
    
};