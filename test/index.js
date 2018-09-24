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
    
    describe('API requests', () => {
       
       describe('GET /api/v1', () => {
           
           it('should return status 200', (done) => {
               
               chai.request(server)
                    .get('/api/v1')
                    .end((err,res) =>{
                        
                        should.not.exist(err);
                        
                        res.should.have.status(200);
                        
                        done();
                        
                    });
               
           });
           
           it('should return a json response', (done) => {
               chai.request(server)
                    .get('/api/v1')
                    .end((err,res) =>{
                        
                        should.not.exist(err);
                        
                        res.should.be.json;
                        
                        done();
                        
                    });
               
           });
           
           it('should return a message', (done) => {
               chai.request(server)
                    .get('/api/v1')
                    .end((err,res) =>{
                        
                        should.not.exist(err);
                        res.body.message.should.equal('Here is where the API resides');
                        
                        done();
                        
                    });
               
           });
           
           
           
       });
       
       describe('GET /api/v1/business', () => {
           
           it('should return a json response', (done) => {
               chai.request(server)
                    .get('/api/v1/business')
                    .end((err,res) =>{
                        
                        res.should.be.json;
                        
                        done();
                        
                    });
               
           });
           
           it('should return a status 400 response when no query parameters are passed', (done) => {
               chai.request(server)
                    .get('/api/v1/business')
                    .end((err,res) =>{
                       
                        res.should.have.status(400);
                        
                        done();
                        
                    });
               
           });
           
           it('should return a message stating invalid request', (done) => {
               chai.request(server)
                    .get('/api/v1/business')
                    .end((err,res) =>{
                        
                        res.body.message.should.equal('Invalid Request');
                        
                        done();
                        
                    });
               
           });
           
       });
        
    });
    
    
});
