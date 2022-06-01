const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('socialcredit', {
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
  	socialcredit: {
  		type: DataTypes.BIGINT,
  		defaultValue: 10,
  		allowNull: false,
  	},
  },
  {
    timestamps : false,
    freezeTableName : true,
  });
};