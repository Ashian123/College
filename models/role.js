const moment= require('moment') 

module.exports = (sequelize, Sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    _id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },  	
	name: {
	type: Sequelize.STRING,
	allowNull:false,
	unique: true
	},
	mainroles: {
	type: DataTypes.ENUM('itadmin','sadmin','admin','staff','enduser','public'),
	allowNull:false,
	defaultValue:'public'
	},	
	rules: { type: Sequelize.JSON, allowNull:false,defaultValue:{} },
    active: { type: Sequelize.BOOLEAN, defaultValue:false },
    del: { type: Sequelize.BOOLEAN, defaultValue:false },
    createdAt: { type:Sequelize.DATE, defaultValue: Sequelize.fn('now') ,get() { return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss'); } },
    updatedAt: { type:Sequelize.DATE, defaultValue: Sequelize.fn('now') ,get() { return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss'); } }
  });
  return Role;
};