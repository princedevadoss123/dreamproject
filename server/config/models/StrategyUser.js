var sequelize = require('../../DatabaseUtil')
var Sequelize = require('sequelize')
const StrategyUser = sequelize.define('strategyuser',{
	userid:{
		type:Sequelize.STRING,
		primaryKey: true
	},
	provider:{
		type:Sequelize.STRING	
	},
	emailid:{
		type:Sequelize.STRING
	},
	username:{
		type:Sequelize.STRING
	},
	isdeleted:{
		type:Sequelize.BOOLEAN
	},
	contact:{
		type:Sequelize.STRING
	}
},{
	timestamps: false
});



module.exports = StrategyUser