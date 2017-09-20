'use strict'
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.jwtSecret || 'ilovecats'
const expiration = "2 days"

/**
 * Expose
 */

exports.signToken = function(obj) {
    return jwt.sign(obj, jwtSecret, {expiresIn: expiration})
}

exports.verifyToken = function(token) {
    let obj
    
    try { 
        obj = jwt.verify(token, jwtSecret)
    } catch (e) {
       return null 
    }
    
    return obj
    
}
