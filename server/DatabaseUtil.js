const sequelize = require('sequelize')
const db_config = require('./config/DBConfiguration/postgres')

var Sequelize = new sequelize(db_config.dbname, db_config.dbuser, db_config.dbpassword, {
  host: db_config.host,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

Sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });


module.exports=Sequelize