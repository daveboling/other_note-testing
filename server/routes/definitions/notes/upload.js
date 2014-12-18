'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Upload a Photo',
  tags:['notes'],
  cors: {origin: ['http://localhost:8100'],credentials: true},
  validate: {
    params: {
      noteId: Joi.number().required()
    }
  },
  payload:{
    maxBytes: 4194304, // 2^22 ; 4MB
    output:'stream',
    parse: true,
    timeout: 60000
  },
  handler: function(request, reply){
    console.log(request.payload.file, request.payload.file.hapi.filename);
    Note.upload(request.auth.credentials, request.payload.file, request.payload.file.hapi.filename, request.params.noteId, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};
