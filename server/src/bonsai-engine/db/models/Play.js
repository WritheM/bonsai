export default function (sequelize, S) {
    return sequelize.define("Play", {
            room_id: S.INTEGER,
            media_id: S.INTEGER,
            added_by: S.INTEGER,
            start_time: S.DATE
        }, {
            underscored: true
        }
    );
};