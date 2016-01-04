# Geolocator IP Koa Middleware

Using [FreeGeoIP](http://freegeoip.net/json/) to geolocate the user by request IP.  (note: there is a 10,000 per hour request limit)

## Install
```javascript
npm install --save koa-geolocator-ip
```

## Usage
```javascript
var app = koa();

app.use(ipLocator({
  blacklist: [   //array of urls not to include geolocation
    '/',
    '/api/users(/:id)',
    '/api/products']
}));

app.use(function* (next){
  if ( ! this.request.noLocate) {
    var city = this.request.ipLocation.city
  }

  yield* next;
});
```

## Default data

Here is the default object you'll get from the geolocator
```javascript
{
  latitude: json.latitude,
  longitude: json.longitude,
  country: json.country_name,
  city: json.city,
  zip: json.zip_code,
  tz: json.time_zone
}
```

## Custom transformer

You can set your own custom transformer to what FreeGeoIP gives you back.

To set a transformer simply set it in your options.  It's a simple function that takes in the json and return the object that will be in `request.ipLocation`.

```javascript

app.use(ipLocator({
  transformer: function (json) {
      return {
        state: json.region_code,
        city: json.city,
        metro: json.metro_code
      }
  }
}));

```
