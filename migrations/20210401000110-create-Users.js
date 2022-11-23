"use strict";
const DataTypes = require('sequelize').DataTypes;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING(50),
                field: 'firstName'
            },
            middleName: {
                type: DataTypes.STRING(50),
                field: 'middleName'
            },
            lastName: {
                type: DataTypes.STRING(50),
                field: 'lastName'
            },
            mobile: {
                type: DataTypes.STRING(15),
                field: 'mobile'
            },
            email: {
                type: DataTypes.STRING(50),
                field: 'email'
            },
            passwordHash: {
                type: DataTypes.STRING(32),
                field: 'passwordHash'
            },
            registeredAt: {
                type: DataTypes.DATE,
                field: 'registeredAt',
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            lastLogin: {
                type: DataTypes.DATE,
                field: 'lastLogin'
            },
            intro: {
                type: DataTypes.TEXT,
                field: 'intro'
            },
            profile: {
                type: DataTypes.TEXT,
                field: 'profile'
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'createdAt'
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updatedAt'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    },
};
