'use strict'
const mongoose = require('mongoose');

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
        
      }
      
      let newUser = new User();
      
      newUser.username = username;
      newUser.domain = domain;
      newUser.image_url = imageUrl 
      newUser.save((err) => {
          
          if(err) return done(err);
          
          return done(null,newUser);
          
      });
      
  });
    
};


let User = mongoose.model('User', UserSchema);

module.exports = User;