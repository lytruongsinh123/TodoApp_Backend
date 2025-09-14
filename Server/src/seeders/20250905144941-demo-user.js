"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "User",
            [
                {
                    email: "fake1@gmail.com",
                    password: "123456",
                    username: "fake1",
                },
                {
                    email: "fake2@gmail.com",
                    password: "123456",
                    username: "fake2",
                },
                {
                    email: "fake3@gmail.com",
                    password: "123456",
                    username: "fake3",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
