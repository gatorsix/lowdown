var koa = require('koa');
var passport = require('koa-passport');
var serve = require('koa-static');
var Router = require('koa-router');

var app = koa();
var route = new Router();

route.get('/login', passport.authenticate('github'));
route.get('/logout', function *() {
  this.logout();
  this.redirect('/');
});

route.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/fail'
}));

route.get('/fail', function *() {
  this.body = 'ONOES! Auth has failed!';
});

route.get('/', function *(next) {
  if(!Object.keys(this.session.passport).length) return yield next;
  var github = this.session.passport.user;
  yield this.render('index', github);
});

app.use(route.middleware());
app.use(serve('app/assets'));

module.exports = app;