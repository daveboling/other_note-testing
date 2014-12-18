'use strict';

var cp         = require('child_process'),
    h          = require('../../helpers/helpers'),
    db         = h.getDb();


describe('logout', function(){
  beforeEach(function(done){
     cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
        browser.get('/#/login');
        element(by.model('user.username')).sendKeys('Bob');
        element(by.model('user.password')).sendKeys('1234');
        element(by.css('button[ng-click]')).click();
        expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
        done();
     });
  });

  it('should logout user', function(){
    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeTruthy();
    element(by.css('a#avatarlink[ng-click]')).click();
    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeFalsy();
  });



});


