var koa = require('koa');
var ipLocator = require('./');
var app = koa();

app.use(ipLocator({
  blacklist: ['/', '/api/users(/:id)'], //array of blacklist
  /* transformer: function (json) {
      return {
        city: json.city
      };
  } */
}));

app.use(function *() {
  this.body = JSON.stringify(this.request.ipLocation, null, 4);
});

app.listen(3000);
