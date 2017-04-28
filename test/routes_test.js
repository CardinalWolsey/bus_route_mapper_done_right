var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');
process.env.MONGODB_URI = 'mongodb://localhost/bus_routes_test';
require(__dirname + '/../server');

var Route = require(__dirname + '/../models/busRoute');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleServerError');

describe('bus routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  before('generating a token', function(done) {
    var user = new User();
    user.username = 'test';
    user.auth.basic.username = 'test';
    user.hashPassword('foobar123');

    user.save(function(err, data) {
      if (err) throw handleError(err, res);

      user.generateToken(function(err, token) {
        if (err) return handleError(err, res);

        this.token = token;
        done();
      }.bind(this));
    }.bind(this));
  });

  it('should be able to create a route', function(done) {
    var routeData = {
      type: "Feature",
      properties: {
        ROUTE: "999",
        RTE_NUM: "999",
        SVC_TYPE: "",
        Shape_len: 1
      },
      geometry: {
        type: "MultiLineString",
        coordinates: [[[0,0], [1,1]]]
      },
      token: this.token
    };

    chai.request('localhost:3000')
      .post('/api/busroutes')
      .send(routeData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.properties.ROUTE).to.eql('999');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('busroutes GET, PUT, DELETE', function() {
    beforeEach(function(done) {
      (new Route({
        type: "Feature",
        properties: {
          ROUTE: "998",
          RTE_NUM: "998",
          SVC_TYPE: "",
          Shape_len: 1
        },
        geometry: {
          type: "MultiLineString",
          coordinates: [[[0,0], [1,1]]]
        },
      })).save(function(err, data) {
        expect(err).to.eql(null);
        this.route = data;
        done();
      }.bind(this));
    });

    it('should be able to get one bus route by route number', function(done) {
      chai.request('localhost:3000')
        .get('/api/busroutes/998')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          var routeArray = res.body;
          expect(routeArray[0].properties.ROUTE).to.eql('998');
          done();
        });
    });

    it('should be able to modify a route by id', function(done) {
      chai.request('localhost:3000')
        .put('/api/busroutes/' + this.route._id)
        .send({properties:{ROUTE: 888}, token: this.token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('successfully updated route');
          done();
        });
    });

    it('should be able to remove a route by id', function(done) {
      chai.request('localhost:3000')
        .delete('/api/busroutes/' + this.route._id)
        .send({token: this.token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('successfully deleted route');
          done();
        });
    });

    it('should be able to find nearby routes', function(done) {
      chai.request('localhost:3000')
        .get('/api/nearbusroutes/?lng=1.001&lat=1&radius=400')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res.body).to.have.length.above(0);
          done();
        });
    });

    it('should fail to find nearby routes', function(done) {
      chai.request('localhost:3000')
        .get('/api/nearbusroutes/?lng=2.001&lat=2&radius=400')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res.body).to.have.length(0);
          done();
        });
    });

  });
});
