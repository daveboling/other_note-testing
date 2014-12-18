var config = {};

if(process.env.TRAVIS_JOB_NUMBER){
  config = require('./protractor-sauce.conf');
}else{
  config = require('./protractor-local.conf');
}


//need to see where tests are
config.suites = {
  home:     'test/e2e/home/**/*.spec.js',
  auth:     'test/e2e/authentication/**/*.spec.js',
  notes:     'test/e2e/notes/**/*.spec.js'
};

//Jasmine configuration
config.jasmineNodeOpts = {
  isVerbose: true,
  showColors: true,
  defaultTimeoutInterval: 30000
};

//What URL is being tested?
config.baseUrl = 'http://localhost:9001';


/*
To run protractor type in console: protractor protractor.conf.js
*/


exports.config = config;
