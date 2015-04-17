"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    high_score: DataTypes.INTEGER
  }, {
    underscored: true,

    classMethods: {
      associate: function(models) {
        users.hasMany(models.posts, { foreignKey: 'user_id' });
      }
    }
  });
  return users;
};
