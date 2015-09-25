var path = require("path");
var config = require("config").database;

//sequelize likes to implement the database config functionality itself..
// while we use the package `config` to implement our configs
// we just convert the config in here for consistency

// config already handles the different environments transparently
//  while sequelize expects config sections for them,
//  so we just export whatever config returns into the current environment

var env = process.env.NODE_ENV || 'development';
exports[env] = config;