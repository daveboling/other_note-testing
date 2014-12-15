/* jshint expr:true */


'use strict';

var expect     = require('chai').expect,
    Lab        = require('lab'),
    cp         = require('child_process'),
    lab        = exports.lab = Lab.script(),
    Note       = require('../../server/models/note'),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    h          = require('../helpers/helpers'),
    db         = h.getDb(),
    noteId     = null,
    fs         = require('fs');


describe('User', function(){
  beforeEach(function(done){
     cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
       Note.create({id:1}, {title: 'a', body: 'b', tags: 'a, b, c'}, function(err, results){
        noteId = results;
        done();
       });
     });
  });

  describe('constructor', function(){
    it('create a User object', function(done){
      var note = new Note();
      expect(note).to.be.instanceof(Note);
      done();
    });
  });

  describe('.create', function(){
    it('should create a new note', function(done){
      var payload = {title: 'Test Note', body: 'Test body', tags: 'tags'};
      Note.create({id: 1}, payload, function(err, result){
        expect(err).to.be.null;
        expect(result).to.be.ok;
        done();
      });
    });
  });

  describe('.query', function(){
    it('should get all notes based on query string parameters', function(done){
      var query = {limit: 10, offset: 0, tag: '%'};
      Note.query({id: 1}, query, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(3);
        done();
      });
    });
    it('should get display notes based on query params', function(done){
      var query = {limit: 1, offset: 0, tag: '%'};
      Note.query({id: 1}, query, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
        done();
      });
    });
  });

  describe('.show', function(){
    it('should display a single note', function(done){
      Note.show({id: 1}, noteId, function(err, result){
        expect(err).to.be.null;
        expect(result.title).to.equal('a');
        done();
      });
    });
  });

  describe('.count', function(){
    it('should count note from a user', function(done){
      Note.count({id: 1}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.equal('3');
        done();
      });
    });
  });

  describe('.upload', function(){
    it('should upload base64 coded image', function(done){
      var file = fs.createReadStream(__dirname + '/../fixtures/img.png');
        Note.upload({token: 'tok'}, file,'img.png', noteId, function(err){
          expect(err).to.be.null;
          done();
       });
    });
  });


  describe('.uploadmobile', function(){
    it('should upload base64 coded image from phone', function(done){
      Note.uploadmobile({token: 'tok'}, 'b64image', noteId, function(err){
        expect(err).to.be.null;
        done();
      });
    });
  });

});









