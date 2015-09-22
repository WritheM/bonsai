export default function (sequelize, S) {
    return sequelize.define("RoomStaff", {
            room_id: S.INTEGER,
            user_id: S.INTEGER,
            role_id: S.INTEGER
        }, {
            underscored: true
        }
    );
};