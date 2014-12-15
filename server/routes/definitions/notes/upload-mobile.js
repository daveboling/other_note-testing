'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Upload a Mobile Photo',
  tags:['notes'],
  cors: {origin: ['http://localhost:8100'],credentials: true},
  timeout: {server:60000},
  validate: {
    params: {
      noteId: Joi.number().required()
    }
  },
  payload:{
    maxBytes: 20500500
  },
  handler: function(request, reply){
    Note.uploadmobile(request.auth.credentials, request.payload.b64, request.params.noteId, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};
