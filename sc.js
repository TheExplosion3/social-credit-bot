const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
// lol i dont know why this doesnt work

module.exports = (sequelize) => {
  return sequelize.define('social-credit', {
  	username: {
  		type: DataTypes.TEXT,
  		unique: true,
      defaultValue: "placeholder",
  	},
  	id: {
      type: DataTypes.BIGINT,
      unique: true,
      unsigned: true,
      primaryKey: true,
      allowNull: false,
      defaultValue: 0xde0b6b3a763ffff,
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