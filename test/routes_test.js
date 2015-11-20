var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/bus_routes_test';
require(__dirname + '/../server');
//pulling it in down here is a reminder that mongoose is being modified by server.js
var mongoose = require('mongoose');
//need to define the Route constructor to match how routes are formatted in the county data
var Route = require(__dirname + '/../models/busRoute');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleServerError');

describe('bus routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

//need to add code to create a user and set token to this.token
//needs to create a username and password
//needs to hash password and get back a token
//needs to use token to authenticate each route with the token
    // before(function(done) {
    //   var user = new User();
    //   user.username = 'test';
    //   user.basic.username = 'test';
    //   var passwordHash = user.hashPassword('foobar123');
    //   console.log('&&&&#####&&&&&##### :' + passwordHash);
    //   done();
    // });


    // before(function(done) {
    //   var user = new User();
    //   user.username = 'test';
    //   user.basic.username = 'test';
    //   user.hashPassword('foobar123', function(err, res) {
    //     if (err) throw err;
    //     user.save(function(err, data) {
    //       if (err) throw err;
    //       user.generateToken(function(err, token) {
    //         if (err) throw err;
    //         this.token = token;
    //         done();
    //       }.bind(this));
    //     }.bind(this));
    //   }.bind(this));
    // });


// //This is a test outline.  Need to finish and integrate
  // it('should be able to create a route', function(done) {
  //   var routeData = {
  //     type: "Feature",
  //     properties: {
  //       ROUTE: "999",
  //       RTE_NUM: "999",
  //       SVC_TYPE: "",
  //       Shape_len: 1
  //     },
  //     geometry: {
  //       type: "MultiLineString",
  //       coordinates: [[0,0], [1,1]]
  //     }
  //   };

  //   chai.request('localhost:3000')
  //     .post('/api/busroutes')
  //     //add in token: this.token
  //     .send(routeData)
  //     .end(function(err, res) {
  //       expect(err).to.eql(null);
  //       expect(res.body.properties.ROUTE).to.eql('999');
  //       expect(res.body).to.have.property('_id');
  //       done();
  //     });
  // });

// //need to create an 'it should be able to get all routes' test
// // do we want a route that gets all bus routes?

  it('should be able to get one of the bus routes', function(done) {
    chai.request('localhost:3000')
      .get('/api/busroutes/999')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a route', function() {
    beforeEach(function(done) {
      (new Route({
        type: "Feature",
        properties: {
          ROUTE: "999",
          RTE_NUM: "999",
          SVC_TYPE: "",
          Shape_len: 1
        },
        geometry: {
          type: "MultiLineString",
          coordinates: [[0,0], [1,1]]
      }
      //add in token equals this.token
    })).save(function(err, data) {
        expect(err).to.eql(null);
        this.route = data;
        done();
      }.bind(this));
    });

    before('generating a token',function(done) {
      var user = new User();
      user.username = 'test';
      user.auth.basic.username = 'test';
      user.hashPassword('foobar123');

      user.save(function(err, data) {
        if (err) throw handleError(err, res);

        user.generateToken(function(err, token) {
          if (err) return handleError(err, res);

          this.token = token;
        }.bind(this));
      }.bind(this));
      done();
    });

    it('should be able to modify a route', function(done) {
      chai.request('localhost:3000')
        .put('/api/busroutes/' + this.route._id)
        //add in token: this.token
        .send({properties:{ROUTE: 888}, token: this.token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('successfully updated route with put method');
          done();
        });
    });

//     it('should be able to remove a route', function(done) {
//       chai.request('localhost:3000')
//         .delete('/api/busroutes/' + this.route._id)
//         //.set('token', this.token)
//         .end(function(err, res) {
//           expect(err).to.eql(null);
//           expect(res.body.msg).to.eql('successfully deleted route with delete method');
//           done();
//         });
//     });

//     // it('should be able to patch a route');
  });
});
