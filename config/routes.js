'use strict'
const express = require('express');
const Api = require('../app/controllers/api');

/**
 * Expose
 */


module.exports = function(app,passport) {
    
    app.use('/', express.static('./public'));
       
    app.get('/api/v1', Api.main);
    
    app.get('/api/v1/business', Api.getBusinesses);
    
};