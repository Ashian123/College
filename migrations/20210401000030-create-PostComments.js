"use strict";
const DataTypes = require('sequelize').DataTypes;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('PostComments', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(75),
                field: 'title',
                allowNull: false
            },
            published: {
                type: DataTypes.BOOLEAN,
                field: 'published',
                allowNull: false
            },
            publishedAt: {
                type: DataTypes.DATE,
                field: 'publishedAt'
            },
            content: {
                type: DataTypes.TEXT,
                field: 'content'
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'createdAt'
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updatedAt'
            },
            postId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'postId'
            },
            parentId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'parentId'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('PostComments');
    },
};
