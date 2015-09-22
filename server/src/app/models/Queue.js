export default function (sequelize, S) {
    return sequelize.define("Chat", {
            room_id: S.INTEGER,
            user_id: S.INTEGER,
            message: S.STRING,
            style: S.INTEGER
        }, {
            underscored: true
        }
    );
};