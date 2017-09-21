'use strict'
const mongoose = require('mongoose');

let AttendanceSchema = new mongoose.Schema(
    {
        username: String, 
        place: String,
        date: Date
    },
    {
        timestamps: true
    });
    
let Attendance = mongoose.model('Attendance', AttendanceSchema)

module.exports = Attendance