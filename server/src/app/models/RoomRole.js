export default function (sequelize, S) {
    return sequelize.define("RoomRole", {
            room_id: S.INTEGER,
            priority: S.INTEGER,
            name: S.STRING,
            description: S.STRING,
            icon: S.STRING
        }, {
            underscored: true
        }
    );
};