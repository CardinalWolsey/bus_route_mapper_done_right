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
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('test');
      expect(req.auth.password).to.eql('foobar123');
    });
  });
});


describe('auth', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

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
          done();
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

    it('should be able to authenticate with eat auth', function(done) {
      var token2 = this.token;
      var req = {
        body: {
          token: this.token
        },
        headers: {
          token: this.token
        }
      };

      eatAuth(req, {}, function() {
        expect(req.user.username).to.eql('test');
        done();
      });
    });
  });
});
