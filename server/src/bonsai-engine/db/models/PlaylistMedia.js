export default function (sequelize, S) {
    return sequelize.define("PlaylistMedia", {
            playlist_id: S.INTEGER,
            duration: S.INTEGER,
            mediatype: S.INTEGER,
            medialoc: S.STRING,
            title: S.STRING,
            previous_id: S.INTEGER,
            next_id: S.INTEGER
        }, {
            underscored: true
        }
    );
};