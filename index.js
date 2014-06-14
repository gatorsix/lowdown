var koa = require('koa');
var serve = require('koa-static');

var app = koa();

app.use(serve('public'));

app.on('error', function(err){
  console.error('server error', err);
});

app.listen(3000);