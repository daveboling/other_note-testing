'use strict';

module.exports = [
  {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        args: [{log: '*', request: '*'}]
      }]
    }
  },
  {
    register: require('lout')
  },
  {
    register: require('hapi-auth-cookie')
  }
];
