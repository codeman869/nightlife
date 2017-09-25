'use strict'
const express = require('express');
const Api = require('../app/controllers/api');
const path = require('path')
const mongoose = require('mongoose')

const jwt = require('../app/services/jwt')
const AttendanceController = require('../app/controllers/attendanceController')

const User = mongoose.model('User')

const indexFilePath = path.resolve(`${__dirname}/../public/index.html`) 

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
    
}

/**
 * Expose
 */


module.exports = function(app,passport) {
    
    //app.use('/', express.static('./public'));
    app.get('/cc_on.svg', (req, res) => {
        
        res.header('Content-type', 'image/svg+xml')
       const filePath = path.resolve(`${__dirname}/../public/cc_on.svg`) 
       res.sendFile(filePath)
    })   
    
   app.use('/', express.static('./public'));
   app.get('/login', (req,res)=> {
      res.sendFile(indexFilePath)
       
   })
   app.get('/loginSuccess', (req,res)=> {
       
      res.sendFile(indexFilePath)
   })
   /*
   app.get('/', (req,res) => {
      const filePath = path.resolve(`${__dirname}/../public/index.html`) 
      console.log(filePath)
      res.sendFile(filePath)
   })
  */ 
    
    app.get('/api/v1', Api.main);
    
    app.get('/api/v1/business', Api.getBusinesses);
    
    app.get('/auth/twitter', passport.authenticate('twitter', {session: false}));
    
    app.get('/auth/twitter/callback', passport.authenticate('twitter'//, { 
        //successRedirect: '/',
        //failureRedirect: '/api/v1'
    //}
    ), (req,res) => {
      
      let usr = req.user 
      const token = jwt.signToken({profileImage: usr.image_url, username: usr.username, domain: usr.domain}) 
      usr.token = token 
      res.cookie('user', usr.token)
       
      return res.redirect('/')
      //return res.redirect('/loginSuccess')
    });
    
    app.post('/auth', (req,res) => {
        
        let token = req.body.token 
        
        let usr = jwt.verifyToken(token)    
        
        if(!usr) return res.sendStatus(401)
        
        return res.json(usr)
        
        
        
    })
    
    app.post('/attendance/new', AttendanceController.attend)
    app.get('/attendance', AttendanceController.countAttendance)
    app.get('/attendance/:id', AttendanceController.getAttendance)
    
};