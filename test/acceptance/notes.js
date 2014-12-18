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
    cookie     = null,
    fs         = require('fs');


describe('Notes', function(){
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

  describe('post /notes', function(){
    it('should create a new note for a logged in user', function(done){
      var payload = {title: 'test', body: 'test', tags: 'tag1,tag2'},
      options = {
        method: 'post',
        url: '/notes',
        payload: payload,
        headers: {cookie: cookie}
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /notes', function(){
    it('should create a new note for a logged in user', function(done){
      var query = {limit: 10, offset: 0, tag: '%'},
      options = {
        method: 'get',
        url: '/notes',
        query: query,
        headers: {cookie: cookie}
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  // describe('post /notes/{noteId}/upload', function(){
  //   it('should create a new note for a logged in user', function(done){
  //     var streamToPromise = require('stream-to-promise'),
  //     FormData = require('form-data'),
  //     form = new FormData();
  //     form.append('file', fs.readFileSync(__dirname + '/../fixtures/img.png'));

  //     streamToPromise(form).then(function(newForm){
  //       var params   = {noteId: 1},
  //       options = {
  //         method: 'post',
  //         url: '/notes/1/upload',
  //         params: params,
  //         payload: newForm,
  //         headers: {
  //           cookie: cookie,
  //           'content-type': form.getHeaders()['content-type']
  //         }
  //       };

  //       server.inject(options, function(response){
  //         expect(response.statusCode).to.equal(200);
  //         done();
  //       });

  //     });
  //   });
  // });


});
