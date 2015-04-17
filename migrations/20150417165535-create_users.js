"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("users", {
    	id: {
    		allowNull: false,
    		autoIncrement: true,
    		primaryKey: true,
    		type: DataTypes.INTEGER
    	},
    	username: {
    		type: DataTypes.STRING,
    		unique: true
    	},
    	password: {
    		type: DataTypes.STRING
    	},
    	high_score: {
    		type: DataTypes.INTEGER
    	},
    	created_at: {
    		allowNull: false,
    		type: DataTypes.DATE
    	},
    	updated_at: {
    		allowNull: false,
    		type: DataTypes.DATE
    	}
    }).done(done)
  },

  down: function(migration, DataTypes, done) {
   	migration.dropTable("users").done(done)
  }
};
