/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const basename = path.basename(__filename);
const db = {};

const currentDb = (process.env.NODE_ENV === 'TEST'
  ? process.env.DB_TEST_NAME
  : process.env.DB_NAME);

// add db username and db password if required
const sequelize = new Sequelize(currentDb, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && !file.includes('test'))
  .forEach((file) => {
    const model = require(`${path.join(__dirname, file)}`)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
