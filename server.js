'use strict'
const express=require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const models = path.join(__dirname, 'app','models');
const port = process.env.PORT || 3000;
const app = express();

//Bootstrap Models
fs.readdirSync(models).filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(path.join(models,file)));

//Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nightlife');

require('./config/express')(app,passport);
require('./config/routes')(app,passport);


let server = app.listen(port, () => { console.log(`Application running on port: ${port}`);});

module.exports = app;