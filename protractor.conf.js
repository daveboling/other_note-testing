var config = {};

config.seleniumAddress = 'http://localhost:4444/wd/hub';
config.multipleCapabilities = [
  {
    'browserName': 'firefox'
  }
];


//need to see where tests are
config.suites = {
  home: 'test/e2e/home/**/*.spec.js'
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
