'use strict'
const mongoose = require('mongoose');

let BlacklistTokenSchema = new mongoose.Schema(
    {
       token_id: String,
       
    },
    {
        timestamps: true
    });
    
let BlacklistToken = mongoose.model('BlacklistToken', BlacklistTokenSchema)

module.exports = BlacklistToken