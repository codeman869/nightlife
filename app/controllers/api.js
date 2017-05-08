'use strict'
const YelpAPI = require('../../config/yelp-api');

/**
 * Expose
 */

exports.main = function(req,res) {
    
  res.json({message: 'Here is where the API resides'});
    
};

exports.getBusinesses = function(req,res) {
  
  YelpAPI.getBusiness((err,data) => {
            
            if(err) return res.json(err);
            
            res.json(data);
            
            
        });  
    
};