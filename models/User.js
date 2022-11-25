const bcrypt = require("bcrypt");
const moment= require('moment');
const { DataTypes, Sequelize } = require('sequelize');
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
//const sequelize = require("sequelize");
class User extends Sequelize.Model {
    static initModel(sequelize) {
        User.init({
    _id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },  
		password: {
		type: Sequelize.STRING,
		allowNull:false,
		validate: {
			set(value) {
			if (value.length >= 8 && value.length <= 20) {
			this.setDataValue("password", bcrypt.hashSync(value, 10));
			} else {
			throw new Error('Your password should be between 8-20 characters!');
			}
			}
		}
		},	
		user_id: {
		type: Sequelize.STRING,
		allowNull:false,
		unique: true
		},		
		branch: {
		type: Sequelize.STRING,
		defaultValue:'main',
		allowNull:false,
		},		
	name: { type: Sequelize.STRING, allowNull:false },
	email: { type: Sequelize.STRING,unique: true },
    role: { type: Sequelize.STRING, allowNull:false, defaultValue:'staff' },
	mainrole: { type: Sequelize.STRING, allowNull:false, defaultValue:'staff' },
    active: { type: Sequelize.BOOLEAN, defaultValue:false },
    del: { type: Sequelize.BOOLEAN, defaultValue:false },
    createdAt: { type:Sequelize.DATE, defaultValue: Sequelize.fn('now') ,get() { return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss'); } },
    updatedAt: { type:Sequelize.DATE, defaultValue: Sequelize.fn('now') ,get() { return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss'); } }
  }, {
            sequelize
        });
		
		// validate password..
		User.prototype.validPassword = async (password, hash) => {
		return await bcrypt.compareSync(password, hash);
		}
		
        return User;
    }
	
	
}
exports.User = User;
