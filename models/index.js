'use strict';

/*if (process.env.HEROKU_POSTGRESQL_MAROON_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_MAROON_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     5432,
    host:     'ec2-54-225-112-119.compute-1.amazonaws.com',
    logging:  true //false
  })
} else {*/

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('BookLess', 'postgres', 'jenydoby6', {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user')
    // add your other models here
  }
}

module.exports = global.db
