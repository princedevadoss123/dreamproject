var sequelize = require('../../DatabaseUtil')
var Sequelize = require('sequelize')

const User = sequelize.define('User',{
	username:{
		type:Sequelize.STRING
	},
	saltpassword:{
		type:Sequelize.STRING
	},
	emailid:{
		type:Sequelize.STRING,
		primaryKey: true
	},
	contact:{
		type:Sequelize.STRING
	},
	isverified:{
		type:Sequelize.BOOLEAN
	},
	isdeleted:{
		type:Sequelize.BOOLEAN
	},
	saltstring:{
		type:Sequelize.STRING
	}	
},{
	timestamps: false
});

module.exports = User
