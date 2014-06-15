var dotenv = require('dotenv');
dotenv.load();

var koa = require('koa');
var mount = require('koa-mount');
var session = require('koa-sess');
var serve = require('koa-static');

var server = koa();
server.keys = [process.env.SECRET_KEY];
server.use(session());

var passport = require('koa-passport');
require('./auth/github');
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function(github, done) {
  done(null, github);
});

passport.deserializeUser(function(github, done) {
  done(null, github);
});

var path = require('path');
var render = require('koa-ejs');
render(server, {
  root: path.join(__dirname, 'app'),
  layout: false,
  viewExt: 'html.ejs',
  cache: true
});

server.use(mount('/', require('./app')));
server.use(serve('public'));

// tmp
server.use(serve('node_modules'));

server.listen(3000);