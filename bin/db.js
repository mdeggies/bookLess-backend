'use strict';

var Sequelize = require("sequelize");

var sequelize = new Sequelize('BookLess', 'postgres', 'jenydoby6', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize.authenticate().then(function(err) {
    if (err) console.log('Unable to connect to the PostgreSQL database:', err);
    console.log('Connection has been established successfully.');
});

sequelize.sync().then(function() {
    console.log('DB Synced');
});

module.exports = sequelize;
