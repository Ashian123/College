"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostComment = void 0;
const sequelize_1 = require("sequelize");
class PostComment extends sequelize_1.Model {
    static initModel(sequelize) {
        PostComment.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: sequelize_1.DataTypes.STRING(75),
                allowNull: false
            },
            published: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            publishedAt: {
                type: sequelize_1.DataTypes.DATE
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
        return PostComment;
    }
}
exports.PostComment = PostComment;
