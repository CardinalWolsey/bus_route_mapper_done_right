var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/bus_routes_test';
require(__dirname + '/../server');
//pulling it in down here is a reminder that mongoose is being modified by server.js
var mongoose = require('mongoose');
//need to define the Route constructor to match how routes are formatted in the county data
var Route = require(__dirname + '/../models/route');

describe('bus routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

//This is a test outline.  Need to finish and integrate
  it('should be able to create a route', function(done) {
    var routeData = {number: 999};
    chai.request('localhost:3000')
      .post('/api/routes')
      .send(routeData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.number).to.eql(999);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

//need to create an 'it should be able to get one route' test
  it('should be able to get all the routes', function(done) {
    chai.request('localhost:3000')
      .get('/api/routes')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a route', function() {
    beforeEach(function(done) {
      (new Route({number: 999})).save(function(err, data) {
        expect(err).to.eql(null);
        this.route = data;
        done();
      }.bind(this));
    });

    it('should be able to modify a route', function(done) {
      chai.request('localhost:3000')
        .put('/api/routes/' + this.route._id)
        .send({number: 888})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('successfully updated route with put method');
          done();
        });
    });

    it('should be able to remove a route', function(done) {
      chai.request('localhost:3000')
        .delete('/api/routes/' + this.route._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('successfully deleted route with delete method');
          done();
        });
    });

    it('should be able to patch a route');
  });
});


