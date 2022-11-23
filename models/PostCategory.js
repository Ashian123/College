"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategory = void 0;
const sequelize_1 = require("sequelize");
class PostCategory extends sequelize_1.Model {
    static initModel(sequelize) {
        PostCategory.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
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
        return PostCategory;
    }
}
exports.PostCategory = PostCategory;
