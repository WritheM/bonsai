export default function (sequelize, S) {
    return sequelize.define("RoomRolePrivs", {
            role_id: S.INTEGER,
            privilege: S.STRING
        }, {
            underscored: true
        }
    );
};