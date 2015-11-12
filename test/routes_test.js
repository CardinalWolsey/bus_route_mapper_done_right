var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/bus_routes_test';
require(__dirname + '/../server');
//pulling it in down here is a reminder that mongoose is being modified by server.js
var mongoose = require('mongoose');

describe('bus routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

//will modify this later
  it('should be able to get all the routes', function(done) {
    chai.request('localhost:3000')
      .get('api/routes')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});
