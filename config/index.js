'use strict'
const path = require('path');

/**
 * Expose
 */
 
exports.root = path.join(__dirname, '..');
exports.yelpAPI = process.env.yelpAPI || 'yelpSecret';

