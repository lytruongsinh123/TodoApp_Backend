"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // title: DataTypes.STRING,
        // description: DataTypes.STRING,
        // importance: DataTypes.NUMBER,
        // dueDate: DataTypes.STRING,
        // startDate: DataTypes.STRING,
        // completed: DataTypes.BOOLEAN,
        await queryInterface.createTable("Task", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            importance: {
                type: Sequelize.INTEGER,
            },
            dueDate: {
                type: Sequelize.STRING,
            },
            startDate: {
                type: Sequelize.STRING,
            },
            completed: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Task");
    },
};
