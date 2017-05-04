'use strict'
const YelpAPI = require('./yelp-api');
const express = require('express');
const path = require('path');
/**
 * Expose
 */

module.exports = function(app,passport) {
    /*
    app.get('/', (req,res) => {
        
        res.send(200);
        
    });
    */
    
    app.use('/', express.static('./public'));
    
    app.get('/api/v1', (req,res) => {
        
        res.json({message: 'Here is where the API resides'});
        
    });
    
    app.get('/api/v1/business', (req,res) => {
        
        YelpAPI.getBusiness((err,data) => {
            
            if(err) return res.json(err);
            
            res.json(data);
            
            
        });
        
        
    });
    
}