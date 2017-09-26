'use strict'
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')

const BlacklistToken = mongoose.model('BlacklistToken')

const jwtSecret = process.env.jwtSecret || 'ilovecats'
const expiration = "2 days"

/**
 * Expose
 */

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
