const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')

describe('Unit testing the / route', function() {

    it('should return OK status', function() {
        return request(app)
            .get('/')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });


});

describe('Unit testing the /users/login route', function() {

    it('should return OK status', function() {
        return request(app)
            .get('/users/login')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });


});

describe('Unit testing the /users/signup route', function() {

    it('should return OK status', function() {
        return request(app)
            .get('/users/signup')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });


});

describe('Unit testing the /users/login post route', function() {

    it('should return FOUND status', function() {
        return request(app)
            .post('/users/login')
            .send({ user_name: 'example', password: 'example' })
            .then(function(response) {
                console.log(response.status);
                assert.equal(response.status, 302);
            });
    });


});

describe('Unit testing the /users/signup post route', function() {

    it('should return FOUND status', function() {
        return request(app)
            .post('/users/signup')
            .send({ user_name: 'agent', password: 'agent' , role: 'Agent'})
            .then(function(response) {
                console.log(response.status);
                assert.equal(response.status, 302);
            });
    });


});


describe('Unit testing the  route', function() {

    it('should return blog title on rendering', function() {
        return request(app)
            .get('/')
            .then(function(response){
                expect(response.text).to.contain('Blog 1');
            })
    });

});

describe('Unit testing the / route', function() {

    it('should return blog title on rendering', function() {
        return request(app)
            .get('/')
            .then(function(response){
                expect(response.text).to.contain('Blog 2');
            })
    });

});

describe('Unit testing the /blog/id: route', function() {

    it('should return blog title on rendering', function() {
        return request(app)
            .get('/blog/5c51361f9797e925b0126fc6')
            .then(function(response){
                expect(response.text).to.contain('Blog 1');
            })
    });

});
describe('Unit testing the /blog/id: route', function() {

    it('should return author on rendering', function() {
        return request(app)
            .get('/blog/5c51361f9797e925b0126fc6')
            .then(function(response){
                expect(response.text).to.contain('Loreum Ipsum');
            })
    });

});
describe('Unit testing the /blog/id: route', function() {

    it('should return author on rendering', function() {
        return request(app)
            .get('/blog/5c51516faa499611243d34ed')
            .then(function(response){
                expect(response.text).to.contain('Added 1');
            })
    });

});







