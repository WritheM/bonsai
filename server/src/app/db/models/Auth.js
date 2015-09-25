export default function (sequelize, S) {
    return sequelize.define("Auth", {
            user_id: S.INTEGER,
            token: S.STRING,
            created: S.DATE,
            last: S.DATE
        }, {
            underscored: true
        }
    );
};