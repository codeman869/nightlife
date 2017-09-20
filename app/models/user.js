'use strict'
const mongoose = require('mongoose');
const jwt = require('./../services/jwt')

let UserSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            unique: true
        },
        password: String,
        domain: String,
        image_url: String,
    },
    {
        timestamps: true
    });
    

UserSchema.statics.findOrCreate = function(username,domain, imageUrl, done) {
  let schema = this 
  
  this.findOne({username: username, domain: domain}, function(err,usr) {
      if(err) return done(err);
      
      if(usr) {
          
         
         return done(null,usr)
         //let jwtToken = jwt.signToken({username: usr.username, domain: usr.domain}) 
         
         /*usr.token = jwtToken
         usr.save((err, updatedUsr) => {
            if(err) return done(err)
             
            return done(null, updatedUsr) 
         })
         */
         
      }
      
      let newUser = new User();
      
      newUser.username = username;
      newUser.domain = domain;
      newUser.image_url = imageUrl 
      console.log(newUser)
      newUser.save((err) => {
          
          if(err) return done(err);
          
          return done(null,newUser);
          
      });
      
  });
    
};


let User = mongoose.model('User', UserSchema);

module.exports = User;