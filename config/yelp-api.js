'use strict'
const http = require('http');
const bl = require('bl');
const config = require('./');
const request = require('request');

let TOKEN = config.yelpAPI;

/**
 * Expose
 */
 exports.getBusiness = function(location, cb) {
        
        let query = new Object(location);
        
        query.term = 'bar';
        query.sort_by = 'rating';
        
        request({
            url:'https://api.yelp.com/v3/businesses/search',
            method: 'GET',
            qs: query,
            auth: {
                'bearer': TOKEN
            }
        }, (err,res,body)=>{
            
            if(err) return cb(err);
             
             cb(null,JSON.parse(body));
         
        });
}  ;
 