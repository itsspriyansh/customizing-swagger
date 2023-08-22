const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.sequelize.sync().then(() => {
    console.log('Database and tables created.');
}).catch(err => {
    console.log('Error: ', err);
})

module.exports = db;