'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Blogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            author: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            contentMarkdown: {
                type: Sequelize.TEXT
            },
            contentHTML: {
                type: Sequelize.TEXT
            },
            avatar: {
                type: Sequelize.BLOB('long')
            },
            advisor: {
                type: Sequelize.STRING
            },
            inspector: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Blogs');
    }
};