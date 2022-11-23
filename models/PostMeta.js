"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMeta = void 0;
const sequelize_1 = require("sequelize");
class PostMeta extends sequelize_1.Model {
    static initModel(sequelize) {
        PostMeta.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            key: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            content: {
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
        return PostMeta;
    }
}
exports.PostMeta = PostMeta;
