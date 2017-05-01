'use strict'
let server = require('../server');
let base_uri = `http://localhost:${process.env.port}/`;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Basic setup testing',() => {
    
    describe("GET /", () => {
        
        it('should return status 200', (done)=>{
            
            chai.request(server)
                .get('/')
                .end((err,res) => {
                    
                    should.not.exist(err);
                    
                    res.should.have.status(200);
                    
                    done();
                    
                });
            
        });
        
    });
    
    
});
