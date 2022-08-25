"use strict";
const bcrypt = require("bcrypt");
require("dotenv").config();
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("staff", [
      {
        first_name: "Super",
        last_name: "Staff",
        email: "super@spleet.africa",
        password: bcrypt.hashSync("secret", Number(process.env.BCRYPT_SALT)),
        phone_number: "07030000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
