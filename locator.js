var request = require('co-request');
var FreeGeoIPTransformer = require('./transformers/FreeGeoIPTransformer');
function ipLocator(options) {

  var transformer = options.transformer || FreeGeoIPTransformer;

  return function *ipLocator(next){
    if ( this.request.noLocate) {
      this.request.ipLocation = null;
      yield next;
    } else {
      var reqIp = this.request.ip,
          apiRoute = 'http://freegeoip.net/json/' + reqIp,
          result = yield request(apiRoute),
          json = JSON.parse(result.body);

      var data = transformer(json);

      this.request.ipLocation = data;
      yield next;
    }

  }
}

module.exports = ipLocator;
