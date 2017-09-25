'use strict'
const mongoose = require('mongoose')

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
    
    let usr = jwt.verifyToken(token)
    
    if(!usr) return res.status(401).json({
        error: true,
        message: 'Invalid token!'
    })
    
   let place = req.body.place 
   if(!place) return res.status(400).json({
       error: true,
       message: 'No location specified for attendance' 
   })
   
   let newAttendance = new Attendance()
   newAttendance.username = usr.username
   newAttendance.place = place 
   newAttendance.date = new Date()
   newAttendance.save((err, updatedAttendance) => {
       
      if(err) return res.status(500).json(err)
      
      
      return res.status(200).json(updatedAttendance)
      
   })  
}