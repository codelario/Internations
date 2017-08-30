let _ = require("lodash");
let environment = require("./" + (process.env.NODE_ENV || "development") + ".js");
let config = require("./config");
module.exports = _.merge({}, environment, config);