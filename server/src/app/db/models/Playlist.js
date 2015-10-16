export default function (sequelize, S) {
    return sequelize.define("Playlist", {
            user_id: S.INTEGER,
            name: S.STRING,
            next_id: S.INTEGER,
            previous_id: S.INTEGER
        }, {
            underscored: true
        }
    );
};