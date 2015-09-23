//credit to http://www.redotheweb.com/2013/02/20/sequelize-the-javascript-orm-in-practice.html

var Sequelize = require('sequelize');
var config = require('config').database;

var sequelize = new Sequelize(
    config.name,
    config.username,
    config.password,
    config.options
);

var models = [
    "Media",
    "Play",
    "Queue",
    "Room",
    "RoomRole",
    "RoomRolePrivs",
    "RoomStaff",
    "User"
];

models.forEach(model => {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function (m) {
    //TODO: define relations (https://github.com/WritheM/bonsai/issues/25)
})(module.exports);

sequelize.sync();

module.exports.sequelize = sequelize;