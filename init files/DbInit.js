// use with node in the shell to reinitialize the tables, if already made previously use node DbInit.js --f or --force

const Sequelize = require('sequelize');

const sequelize = new Sequelize('username', 'id', 'social-credit', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const sc = require('../sc.js')(sequelize, sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force });