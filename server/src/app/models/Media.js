export default function (sequelize, S) {
    return sequelize.define("Media", {
            user_id: S.INTEGER,
            duration: S.INTEGER,
            mediatype: S.INTEGER,
            medialoc: S.INTEGER,
            title: S.STRING
        }, {
            underscored: true
        }
    );
};