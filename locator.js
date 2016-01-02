var request = require('co-request');

function *ipLocator(next){
  if ( this.request.noLocate) {
    this.request.ipLocation = null;
    yield next;
  } else {
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
    console.log('locator', next);
    yield next;
  }

}

module.exports = ipLocator;
