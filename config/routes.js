'use strict'
const express = require('express');
const Api = require('../app/controllers/api');
const path = require('path')
const mongoose = require('mongoose')

const jwt = require('../app/services/jwt')
const AttendanceController = require('../app/controllers/attendanceController')
const AuthController = require('../app/controllers/authController')

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
    
   app.use('/', express.static('./public'));
   app.get('/login', (req,res)=> {
      res.sendFile(indexFilePath)
       
   })
   app.get('/loginSuccess', (req,res)=> {
       
      res.sendFile(indexFilePath)
   })
    
    app.get('/api/v1', Api.main);
    
    app.get('/api/v1/business', Api.getBusinesses);
    
    app.get('/auth/twitter', passport.authenticate('twitter', {session: false}));
    
    app.get('/auth/twitter/callback', passport.authenticate('twitter'), AuthController.issueToken);
    
    app.post('/auth', AuthController.verifyToken)
    app.delete('/auth/token', AuthController.blacklistToken)  
    
    app.post('/attendance/new', AttendanceController.attend)
    app.get('/attendance', AttendanceController.countAttendance)
    app.get('/attendance/:id', AttendanceController.getAttendance)
    
};