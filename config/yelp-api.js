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
 exports.getBusiness = function(cb) {
        request.get('https://api.yelp.com/v3/businesses/search?location=97015&term=bar&sort_by=rating', {
         
             'auth' : {
                 'bearer': TOKEN
            }
         
        }, (err,req,body)=>{
            if(err) return cb(err);
             
             cb(null,JSON.parse(body));
         
        });
}  ;
 