'use strict'
const mongoose = require('mongoose')
const jwt = require('../services/jwt')

const BlacklistToken = mongoose.model('BlacklistToken')

/**
 * Expose
 */

exports.verifyToken = function(req, res) {
    
    let token = req.body.token 
        
    jwt.verifyToken(token, (err, usr) => {
        
        if(err) return res.sendStatus(500)
        
        if(!usr) return res.sendStatus(401)
        
        return res.json(usr)     
        
    })    
        
    
}

exports.blacklistToken = function(req,res) {
    
    if(!req.headers['authorization-token']) return res.status(401).json({
        error: true,
        message: 'No authorization token found in request'
    })
   
    let token = req.headers['authorization-token'] 
    
    jwt.verifyToken(token, (err, usr) => {
        
        if(err) return res.status(500).json({err: true, message: err})
        
        if(!usr) return res.status(401).json({
            error: true,
            message: 'Invalid token!'
        })
    
        let blacklist = new BlacklistToken()
        blacklist.token_id = usr.jti
    
        blacklist.save((err) => {
            if(err) return res.status(500).json({error: true, message: 'Error blacklisting token'})
        
            return res.status(200).json({error: false, message: 'Successfully blacklisted token id: ' + usr.jti})
        
        })     
        
    })
    
    
}

exports.issueToken = function(req,res) {
    let usr = req.user 
    
    const token = jwt.signToken({profileImage: usr.image_url, username: usr.username, domain: usr.domain}) 
    usr.token = token 
    res.cookie('user', usr.token)
       
    return res.redirect('/')
}