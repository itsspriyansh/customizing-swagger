module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        }
    });
    return Users;
}
