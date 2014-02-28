'use strict';

var should = require('should'),
    http = require('http'),
    rootUrl = 'http://localhost:3000';

describe('Server', function () {
  var server;

  before(function(done){
    server = require(__dirname + '/../../server.js');
    server.defer
    .then( function() {
      done();
    })
    .fail( function() {
      console.error('Server failed to start');
    });
  });

  it("should return 200 from the home page '/'", function(done){
    http.get(rootUrl+'/', function(res) {
      should.equal(res.statusCode, 200);
      done();
    }).on('error', function(err) {
      console.log('Got error from server: ', err);
    });
  });

  after(function(done) {
    server.cleanup();
    done();
  });
});
