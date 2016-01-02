var request = require('co-request');
var ipUtil = require('ip');

function ipLocator(options) {
  return function *ipLocatorGenerator(next){
    var reqIp = this.request.ip,
        apiRoute = 'http://freegeoip.net/json/' + reqIp,
        result = yield request(apiRoute),
        json = JSON.parse(result.body);

    var data = {
      latitude: json.latitude,
      longitude: json.longitude,
      country: json.country_name,
      city: json.city,
      zip: json.zip_code,
      tz: json.time_zone
    }

    this.request.ipLocation = data;
    yield* next;
  }
}

module.exports = ipLocator;
