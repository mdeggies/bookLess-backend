'use strict';

var Sequelize = require("sequelize");

module.exports = function(sequelize) {
  var User = sequelize.define('users', {
    fb_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    book_wishlist: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    }
  }, {
    timestamps: false,
    createdAt: false,
    freezeTableName: true
  });
  return User;
};
