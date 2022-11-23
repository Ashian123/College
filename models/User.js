"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            firstName: {
                type: sequelize_1.DataTypes.STRING(50)
            },
            middleName: {
                type: sequelize_1.DataTypes.STRING(50)
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING(50)
            },
            mobile: {
                type: sequelize_1.DataTypes.STRING(15)
            },
            email: {
                type: sequelize_1.DataTypes.STRING(50)
            },
            passwordHash: {
                type: sequelize_1.DataTypes.STRING(32)
            },
            registeredAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW
            },
            lastLogin: {
                type: sequelize_1.DataTypes.DATE
            },
            intro: {
                type: sequelize_1.DataTypes.TEXT
            },
            profile: {
                type: sequelize_1.DataTypes.TEXT
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE
            }
        }, {
            sequelize
        });
        return User;
    }
}
exports.User = User;
