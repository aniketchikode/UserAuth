const Sequelize = require('sequelize');
const env = require('./env.js');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host_name: env.host_name,
  port:env.port,
  dialect:env.dialect,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle

  }



});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.users =  require('../model/user.js')(sequelize, Sequelize);

module.exports = db;



