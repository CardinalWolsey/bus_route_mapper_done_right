var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/notes_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/basic_http_authentication');

describe('httpbasic', function() {
  it('should be able to parse http basic auth', function() {
    var req = {
      headers: {
        authorization: 'Basic ' + (new Buffer('test:foobar123')).toString('base64')
        }
    };

    httpBasic(req, {}, function() {
      expect(typeof req.auth).to.be.equ('object');
      expect(req.auth.username).to.eql('test');
      expect(req.req.auth.password).to.eql('foobar123');
    });
  });
});

describe('auth', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

//put in tests to test that our errors are being handled correctly

  it('should be able to create a user', function(done) {
    chai.request('localhost:3000/api')
      .post('/signup')
      .send({username: 'testuser', password: 'foobar123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });

  describe('user already in database', function() {

    //redoing what we are doing inside the post route ... need to modify to pass
    before(function(done) {
      var user = new User();
      user.username = 'test';
      user.basic.username = 'test';
      user.hashPassword('foobar123', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });

    it('should be able to sign in', function(done) {
      chai.request('localhost:3000/api')
        .get('/signin')
        .auth('test', 'foobar123')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.token).to.have.length.above(0);
          done();
        });
    });

    it('should be able to quthenticate with eat auth', function(done) {
      var token = this.token
      var req = {
        headers: {
          token: this.token
        }
      };

      eatAuth(req, {}, function() {
        expect(req.user.username).to.eql('test');
      });
    });
  });
});

//compare all this code to the online code
