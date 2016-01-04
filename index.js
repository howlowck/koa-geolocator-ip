var GateKeeper = require('./pathGatekeeper');
var Locator = require('./locator');

function combined(options) {
  options = options || {};

  return function *combined(next) {
    var gatekeeper = GateKeeper.call(this, options);
    var locator = Locator.call(this, options);
    yield gatekeeper.bind(this, locator.bind(this, next));
  }
}

module.exports = combined;
