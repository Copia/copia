'use strict';

var should = require('should'),
    http = require('http'),
    rootUrl = 'http://localhost:3000';

describe('Server HTTP Tests:', function () {
  var server;

  before(function(done){
    server = require(__dirname + '/../../server.js');
    server.on('ready', done);
  });

  it("should return code 200 with GET of '/'", function(done){
    http.get(rootUrl+'/', function(res) {
      should.equal(res.statusCode, 200);
      done();
    }).on('error', function(err) {
      console.log('Got error from server: ', err);
    });
  });

  after(function(done) {
    server.cleanup(done);
  });
});
