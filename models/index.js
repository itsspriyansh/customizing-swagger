const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize('user-status-api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {max: 5, min: 0, idle: 10000} 
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch(err => {
    console.error('Unable to connect to the database:', err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users')(sequelize, DataTypes);

db.sequelize.sync()
.then(() => console.log('Database and tables created.'))

module.exports = db;