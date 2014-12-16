/* jshint expr:true */


'use strict';

var expect     = require('chai').expect,
    Lab        = require('lab'),
    cp         = require('child_process'),
    lab        = exports.lab = Lab.script(),
    server     = require('../../server/index'),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    h          = require('../helpers/helpers'),
    db         = h.getDb(),
    cookie     = null;


describe('Users', function(){
  beforeEach(function(done){
     cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
        var payload = {username: 'Bob', password: '1234'},
        options = {method: 'post', url: '/login', payload: payload};

        //capture cookie
        server.inject(options, function(response){
          //grabs only the needed portion of the cookie
          cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
          done();
        });
     });
  });

  describe('post /register', function(){
    it('should register a new user', function(done){
      var payload = {username: 'Sam', password: '1234', avatar:'https://www.apple.com/global/elements/flags/16x16/usa_2x.png'},
      options = {
        method: 'post',
        url: '/register',
        payload: payload
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('post /login', function(){
    it('should login an existing user', function(done){
      var payload = {username: 'Bob', password: '1234'},
      options = {
        method: 'post',
        url: '/login',
        payload: payload
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.username).to.equal('Bob');
        done();
      });
    });
  });


  describe('delete /logout', function(){
    it('should logout a logged in user', function(done){
      var options = {
        method: 'delete',
        url: '/logout',
        headers: {cookie: cookie}
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /status', function(){
    it('should get the current status of login', function(done){
      var options = {
        method: 'get',
        url: '/status',
        headers: {cookie: cookie}
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.username).to.equal('Bob');
        done();
      });
    });
  });

});
