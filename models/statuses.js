module.exports = (sequelize, DataTypes) => {
    const Statuses = sequelize.define('statuses', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    return Statuses;
}
