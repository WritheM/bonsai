export default function (sequelize, S) {
    return sequelize.define("Playlist", {
            user_id: S.INTEGER,
            name: S.STRING
        }, {
            underscored: true
        }
    );
};