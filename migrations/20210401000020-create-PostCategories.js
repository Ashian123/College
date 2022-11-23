"use strict";
const DataTypes = require('sequelize').DataTypes;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('PostCategories', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
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
            categoryId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'categoryId'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('PostCategories');
    },
};
