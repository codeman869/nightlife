'use strict'
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
    app.use(passport.initialize());
    
    
    
    
    
    
}