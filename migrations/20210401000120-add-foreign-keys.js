"use strict";
const DataTypes = require('sequelize').DataTypes;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Categories', {
            fields: ['parentId'],
            type: 'foreign key',
            name: 'Categories_parentId_fkey',
            references: {
                table: 'Categories',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('Posts', {
            fields: ['authorId'],
            type: 'foreign key',
            name: 'Posts_authorId_fkey',
            references: {
                table: 'Users',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('Posts', {
            fields: ['parentId'],
            type: 'foreign key',
            name: 'Posts_parentId_fkey',
            references: {
                table: 'Posts',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('PostCategories', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'PostCategories_postId_fkey',
            references: {
                table: 'Posts',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('PostCategories', {
            fields: ['categoryId'],
            type: 'foreign key',
            name: 'PostCategories_categoryId_fkey',
            references: {
                table: 'Categories',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('PostComments', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'PostComments_postId_fkey',
            references: {
                table: 'Posts',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('PostComments', {
            fields: ['parentId'],
            type: 'foreign key',
            name: 'PostComments_parentId_fkey',
            references: {
                table: 'PostComments',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('PostMetas', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'PostMetas_postId_fkey',
            references: {
                table: 'Posts',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('PostTags', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'PostTags_postId_fkey',
            references: {
                table: 'Posts',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('PostTags', {
            fields: ['tagId'],
            type: 'foreign key',
            name: 'PostTags_tagId_fkey',
            references: {
                table: 'Tags',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Categories', 'Categories_parentId_fkey');
        await queryInterface.removeConstraint('Posts', 'Posts_authorId_fkey');
        await queryInterface.removeConstraint('Posts', 'Posts_parentId_fkey');
        await queryInterface.removeConstraint('PostCategories', 'PostCategories_postId_fkey');
        await queryInterface.removeConstraint('PostCategories', 'PostCategories_categoryId_fkey');
        await queryInterface.removeConstraint('PostComments', 'PostComments_postId_fkey');
        await queryInterface.removeConstraint('PostComments', 'PostComments_parentId_fkey');
        await queryInterface.removeConstraint('PostMetas', 'PostMetas_postId_fkey');
        await queryInterface.removeConstraint('PostTags', 'PostTags_postId_fkey');
        await queryInterface.removeConstraint('PostTags', 'PostTags_tagId_fkey');
    }
};
