'use strict';

//all methods and variables are global in Jasmine

describe('home', function(){
  it('should get the home page', function(){
    browser.get('/');
    expect(browser.getTitle()).toEqual('NoteTaker');
  });
});
