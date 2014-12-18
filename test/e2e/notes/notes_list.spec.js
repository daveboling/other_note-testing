'use strict';

var cp         = require('child_process'),
    h          = require('../../helpers/helpers'),
    db         = h.getDb(),
    path       = require('path');


describe('notes_list', function(){
  beforeEach(function(done){
     cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
        login();
        done();
     });
  });

  it('should get notes page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('notes');
  });

  it('should create a note', function(){
    var image = path.resolve(__dirname, '../../fixtures/img.png');

    element(by.model('note.title')).sendKeys('a');
    element(by.model('note.body')).sendKeys('b');
    element(by.model('note.tags')).sendKeys('c,d,e');
    element(by.css('input[type="file"')).sendKeys(image);
    element(by.css('button[ng-click]')).click();

    expect(element(by.model('note.title')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.body')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.tags')).getAttribute('value')).toEqual('');

    expect(element.all(by.repeater('note in notes')).count()).toBeGreaterThan(0);
  });

});

function login(){
  browser.get('/#/login');
  element(by.model('user.username')).sendKeys('Bob');
  element(by.model('user.password')).sendKeys('1234');
  element(by.css('button[ng-click]')).click();
  browser.get('/#/notes');
}

