const Sequelize = require('sequelize');

module.exports = (Sequelize) => {
  return Sequelize.define('social-credit', {
  	username: {
  		type: Sequelize.STRING,
  		unique: true,
  	},
  	id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true
    },
  	social_credit: {
  		type: Sequelize.INTEGER,
  		defaultValue: 10,
  		allowNull: false,
  	},
    
  },
  {
    timestamps : false,
  });
  
}