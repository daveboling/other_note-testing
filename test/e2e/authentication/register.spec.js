'use strict';

var cp         = require('child_process'),
    h          = require('../../helpers/helpers'),
    db         = h.getDb();


describe('register', function(){
  beforeEach(function(done){
     cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
        done();
     });
  });

  it('should get register page', function(){
    browser.get('/#/register');
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('register');
  });

  it('should register a new user', function(){
    //test by ng-model
    element(by.model('user.username')).sendKeys('sam');
    element(by.model('user.password')).sendKeys('1234');
    element(by.model('user.avatar')).sendKeys('https://pbs.twimg.com/profile_images/604644048/sign051.gif');
    element(by.css('button[ng-click]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });

});


