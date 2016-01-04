var UrlMatcher = require('url-pattern');

function isBlacklisted(url, blacklist) {
  return blacklist.some(function (matcher) {
    return !! matcher.match(url);
  });
}

function pathGatekeeper(options) {
  var matcherBlacklist = [],
      urlBlacklist;
      
  urlBlacklist = options.blacklist || [];

  urlBlacklist.map(function (pattern) {
    return matcherBlacklist.push(new UrlMatcher(pattern));
  });

  return function *pathGatekeeper(next){
    if (isBlacklisted(this.request.url, matcherBlacklist)) {
      this.set('X-KoaMiddleware-No-Locate', '1');
      this.request.noLocate = true;
    }
    yield next;
  }
}

module.exports = pathGatekeeper;
