"use strict";
const DataTypes = require('sequelize').DataTypes;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Categories', {
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
            parentId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'parentId'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Categories');
    },
};
