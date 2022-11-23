"use strict";
const DataTypes = require('sequelize').DataTypes;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('PostMetas', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            key: {
                type: DataTypes.STRING(50),
                field: 'key',
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
            postId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'postId'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('PostMetas');
    },
};
