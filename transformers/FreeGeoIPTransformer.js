
var FreeGeoIPTransformer = function (json) {
  return {
    latitude: json.latitude,
    longitude: json.longitude,
    country: json.country_name,
    city: json.city,
    zip: json.zip_code,
    tz: json.time_zone
  };
}

module.exports = FreeGeoIPTransformer;
