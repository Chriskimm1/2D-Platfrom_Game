"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        unique: true
      }
    },
    password_digest: {
      type: DataTypes.STRING
    },
    high_score: DataTypes.INTEGER
  }, {
    underscored: true,

    classMethods: {
      associate: function(models) {
      }
    }
  });
  return users;
};
