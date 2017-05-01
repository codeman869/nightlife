'use strict'

/**
 * Expose
 */

module.exports = function(app,passport) {
    
    app.use('/', (req,res) => {
        
        res.send(200);
        
    });
    
}