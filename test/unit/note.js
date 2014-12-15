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
    db         = h.getDb();


describe('User', function(){
  beforeEach(function(done){
     cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
       done();
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
      Note.create({id: '1337'}, payload, function(err, result){
        expect(err).to.be.null;
        expect(result).to.be.ok;
        done();
      });
    });
  });

});
