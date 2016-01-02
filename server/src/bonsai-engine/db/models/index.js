//credit to http://www.redotheweb.com/2013/02/20/sequelize-the-javascript-orm-in-practice.html
import fs from "fs";
import Sequelize from "sequelize";
import path from "path";

var config = require('config').database;
var basename  = path.basename(module.filename);
var db        = {};

var sequelize = new Sequelize(
    config.name,
    config.username,
    config.password,
    config.options
);

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function(file) {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
