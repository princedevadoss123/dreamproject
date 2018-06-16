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

const StrategyUser = sequelize.define('StrategyUser',{
	UserID:{
		type:DataTypes.String
		primaryKey: true
	},
	Provider:{
		type:DataTypes.String	
	},
	EmailID:{
		type:DataTypes.String
	},
	UserName:{
		type:DataTypes.String
	},
	IsDeleted:{
		type:DataTypes.boolean
	},
	Contact:{
		type:DataTypes.String
	}
	
});

const user_config = {
 User,
 StrategyUser
};

module.exports = user_config
