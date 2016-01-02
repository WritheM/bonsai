export default function (sequelize, S) {
    return sequelize.define("Room", {
            owner_id: S.INTEGER,
            name: S.STRING,
            summary: S.STRING,
            description: S.STRING
        }, {
            underscored: true
        }
    );
};