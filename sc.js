const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('social-credit', {
  	username: {
  		type: DataTypes.STRING,
  		unique: true,
  	},
  	id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
  	social_credit: {
  		type: DataTypes.INTEGER,
  		defaultValue: 10,
  		allowNull: false,
  	},
  },
  {
    timestamps : false,
  });
  
};