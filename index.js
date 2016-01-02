var GateKeeper = require('./pathGatekeeper');
var locator = require('./locator');

function combined(options) {
  return function *combined(next) {
    var gatekeeper = GateKeeper.call(this, options);
    yield gatekeeper.bind(this, locator.bind(this, next));
  }
}

module.exports = combined;
