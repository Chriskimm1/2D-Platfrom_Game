"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false
    },
    high_score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    underscored: true,

    classMethods: {
      associate: function(models) {
      }
    }
  });
  return users;
};
