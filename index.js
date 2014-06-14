var dotenv = require('dotenv');
dotenv.load();

var koa = require('koa');
var serve = require('koa-static');
var session = require('koa-sess');


var server = koa();
server.keys = [process.env.SECRET_KEY];
server.use(session());

var passport = require('koa-passport');
require('./auth/github');
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var Router = require('koa-router');
var app = new Router();

app.get('/login', passport.authenticate('github'));
app.get('/logout', function *() {
  this.logout();
  this.redirect('/');
});

app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/fail'
}));

app.get('/fail', function *() {
  this.body = 'ONOES! Auth has failed!';
});

app.get('/', function *(next) {
  if(!Object.keys(this.session.passport).length) return yield next;
  var user = this.session.passport.user;
  this.body = 'RENDER THE APP: ' + user.displayName;
});

server.use(app.middleware());

server.use(serve('public'));

server.on('error', function(err){
  console.trace(err);
});

server.listen(3000);