export default function (sequelize, S) {
    return sequelize.define("User", {
            //plug_id: { type: Sequelize.INTEGER, primaryKey: true },
            username: S.STRING,
            slug: S.STRING,
            language: S.STRING,
            joined: S.DATE,
            gRole: S.INTEGER
        },
        {
            underscored: true
        }
    );
};