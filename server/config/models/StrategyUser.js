var sequelize = require('sequelize')

const StrategyUser = sequelize.define('StrategyUser',{
	UserID:{
		type:DataTypes.String,
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

module.exports = StrategyUser