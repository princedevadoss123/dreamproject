var sequelize = require('sequelize')

const User = sequelize.define('User',{
	UserName:{
		type:DataTypes.String
	},
	Password:{
		type:DataTypes.String
	},
	EmailID:{
		type:DataTypes.String,
		primaryKey: true
	},
	Contact:{
		type:DataTypes.String
	},
	IsVerified:{
		type:DataTypes.boolean
	},
	IsDeleted:{
		type:DataTypes.boolean
	},
	SaltString:{
		type:DataTypes.String
	}
	
});

module.exports = User
