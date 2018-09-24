'use strict'
const mongoose = require('mongoose')
const moment = require('moment')
const jwt = require('../services/jwt')

const Attendance = mongoose.model('Attendance')


/**
 * Expose
 */
 
exports.attend = function(req,res) {
    
    if(!req.headers['authorization-token']) return res.status(401).json({
        error: true,
        message: 'No authorization token found in request'
    })
   
    let token = req.headers['authorization-token'] 
    
    jwt.verifyToken(token, (err, usr) => {
     if(!usr) return res.status(401).json({
        error: true,
        message: 'Invalid token!'
    })
    
   let place = req.body.place 
   if(!place) return res.status(400).json({
       error: true,
       message: 'No location specified for attendance' 
   })
  //First check to see if the user is already scheduled to attend
  let today = moment().seconds(0).minutes(0).hours(0)
   Attendance.findOne({place: place, date: {$gte: today }, username: usr.username}, (err,att) => {
      if(err) return res.status(500).json(err)
      if(att) return res.status(418).json({error: true, message: 'You have already registered to attend today'})
       
      let newAttendance = new Attendance()
      newAttendance.username = usr.username
      newAttendance.place = place 
      newAttendance.date = new Date()
      newAttendance.save((err, updatedAttendance) => {
       
         if(err) return res.status(500).json(err)
      
      
         return res.status(200).json(updatedAttendance)
      
      })   
       
   })   
        
    })
    
     
     
}

exports.getAttendance = function(req,res) {
   const location = String(req.params.id)
   let currentDate = moment().seconds(0).minutes(0).hours(0)
   Attendance.find({ place: location, date: {$gte: currentDate}}, (err,att) => {
       if(err) return res.status(500).json(err)
       
       return res.status(200).json(att)   
   }) 
}

exports.countAttendance = function(req,res) {
    let currentDate = moment().seconds(0).minutes(0).hours(0)
    
    Attendance.find({date: {$gte: currentDate}}, (err,att) => {
        if(err) return res.status(500).json(err)
        
        return res.status(200).json(att)
    })
    
}

exports.remoteAttendance = function(req,res) {
    
    let currentDate = moment().seconds(0).minutes(0).hours(0)
    const location = String(req.params.id)
    if(!req.headers['authorization-token']) return res.status(401).json({
        error: true,
        message: 'No authorization token found in request'
    })
   
    let token = req.headers['authorization-token'] 
    
    jwt.verifyToken(token, (err, usr) => {
        
        if(err) return res.status(500).json({error: true, message: err})
        
        if(!usr) return res.status(401).json({
            error: true,
            message: 'Invalid token!'
         })
      
        Attendance.findOneAndRemove({date: {$gte: currentDate}, username: usr.username}, (error, att) => {
            
            if(error) return res.status(500).json({error: true, message: error})
            
            if(!att) return res.status(418).json({error: true, message: 'Unable to find attendance'})
            
            return res.status(200).json({error: false, message: 'Successfully removed attendance', location})
        })
    })
}