const log4js = require("log4js");
// Load package.json
const pjs = require("../package.json");

// Get some meta info from the package.json
const { name, version } = pjs;

// Set up a logger
const LOG4J = require("../config/log4j-config-module.js").config();
log4js.configure(LOG4J.api);
const getLogger = () => log4js.getLogger("service-registry");

// Configuration options for different environments
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(),
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(),
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(),
  },
};
