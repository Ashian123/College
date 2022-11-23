"use strict";
const DataTypes = require('sequelize').DataTypes;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Posts', {
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
            metaTitle: {
                type: DataTypes.STRING(100),
                field: 'metaTitle'
            },
            slug: {
                type: DataTypes.STRING(100),
                field: 'slug',
                allowNull: false,
                unique: true
            },
            summary: {
                type: DataTypes.TEXT,
                field: 'summary'
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
            authorId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'authorId'
            },
            parentId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'parentId'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Posts');
    },
};
