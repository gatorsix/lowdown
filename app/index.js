var koa = require('koa');
var passport = require('koa-passport');
var serve = require('koa-static');
var Router = require('koa-router');

var app = koa();
app.use(serve('app/assets'));

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

route.get('/*', function *(next) {
  if(!Object.keys(this.session.passport).length) {
    if(this.request.url === '/') return yield next;
    return this.redirect('/');
  }
  var github = this.session.passport.user;
  yield this.render('index', github);
});

app.use(route.middleware());

module.exports = app;