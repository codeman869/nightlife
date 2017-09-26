'use strict'
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')
const moment = require('moment')

const BlacklistToken = mongoose.model('BlacklistToken')

const jwtSecret = process.env.jwtSecret || 'ilovecats'
const expiration = "2 days"

/**
 * Expose
 */

exports.callbackDelay = 3600000 * 6  //6 hours

exports.signToken = function(obj) {
    const id = uuidv4()    
     
    return jwt.sign(obj, jwtSecret, {expiresIn: expiration, jwtid: id})
}

exports.verifyToken = function(token, cb) {
    let obj
    
    try { 
        obj = jwt.verify(token, jwtSecret)
        let id = String(obj.jti)
        BlacklistToken.findOne({token_id: id}, (err, token) => {
            
            if(err) return cb(err)
            
            if(token) {
                return cb(null, null)
            }
            
            return cb(null,obj)
        })
        
    } catch (e) {
       return cb(null, null) 
    }
    
    
}

exports.clearBlacklists = function() {
    let cutoff = moment().subtract(2, 'd')
    BlacklistToken.remove({createdAt: {$lte: cutoff}}, (err) => {
        if(err) console.warn(err)
    }) 
        
}