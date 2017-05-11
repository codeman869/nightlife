'use strict'
const YelpAPI = require('../../config/yelp-api');

/**
 * Expose
 */

exports.main = function(req,res) {
    
  res.json({message: 'Here is where the API resides'});
    
};

exports.getBusinesses = function(req,res) {
  var query = new Object();
  //console.log(req);
  if(!req.query.lat && !req.query.long && !req.query.location) {
    return res.status(400).json({message: 'Invalid Request'});
  } else if(req.query.lat && req.query.long) {
    query.latitude = Number(req.query.lat);
    query.longitude = Number(req.query.long);
      
    
  } else if(req.query.location) {
    query.location = req.query.location;
    
  } else {
    
    return res.status(400).json({message: 'Invalid Request'});
    
  }
  
  YelpAPI.getBusiness(query,(err,data) => {
            
            if(err) return res.json(err);
            
            res.json(data);
            
            
        });
  
  
  
    
};