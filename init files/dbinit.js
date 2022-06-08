// use with node in the shell to reinitialize the tables, if already made previously use node dbInit.js --f or --force
// update: use d.sh, it is a much faster and more efficient process.

const Sequelize = require('sequelize');

const sequelize = new Sequelize('username', 'id', 'socialcredit', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'db/database.sqlite',
});

const sc = require('../sc.js')(sequelize, sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force });