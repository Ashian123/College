"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
class Post extends sequelize_1.Model {
    static initModel(sequelize) {
        Post.init({
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
            metaTitle: {
                type: sequelize_1.DataTypes.STRING(100)
            },
            slug: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            summary: {
                type: sequelize_1.DataTypes.TEXT
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
        return Post;
    }
}
exports.Post = Post;
