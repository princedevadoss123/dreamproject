let sequelize = require('../../DatabaseUtil')
let Sequelize = require('sequelize')

const User = sequelize.define('user',{
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
		type:Sequelize.BOOLEAN,
		defaultValue: false
	},
	isdeleted:{
		type:Sequelize.BOOLEAN,
		defaultValue: false
	},
	saltstring:{
		type:Sequelize.STRING
	}	
},{
	timestamps: false
});

module.exports = User
