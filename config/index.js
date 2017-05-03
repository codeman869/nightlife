'use strict'
const path = require('path');

/**
 * Expose
 */
 
exports.root = path.join(__dirname, '..');
exports.yelpID = process.env.yelpID || 'testID';
exports.yelpSecret = process.env.yelpSecret || 'yelpSecret';

