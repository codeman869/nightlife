'use strict'
const http = require('http');
const bl = require('bl');
const config = require('./');
const request = require('request');

const postData = {
    
    'client_id': config.yelpID,
    'client_secret': config.yelpSecret,
    'grant_type': 'client_credentials'
    
};

let TOKEN = '';

function getToken() {
    
    request.post({url: 'https://api.yelp.com/oauth2/token', formData: postData}, (err,res,body) => {
        if(err) return console.warn(err);
        
        if(body) {
            var data = JSON.parse(body);
            //console.log(data);
            //console.log(`Received Token: ${data.access_token}`);
            TOKEN = data.access_token;
        }
        
    });
    
}

getToken();

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
 