"use strict";
const DataTypes = require('sequelize').DataTypes;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('PostTags', {
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
            tagId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'tagId'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('PostTags');
    },
};
