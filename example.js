var koa = require('koa');
var ipLocator = require('./');
var app = koa();

app.use(ipLocator());
app.use(function *() {
  this.body = JSON.stringify(this.request.ipLocation, null, 4);
});

app.listen(3000);
