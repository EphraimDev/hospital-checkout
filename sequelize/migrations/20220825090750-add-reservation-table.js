"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("reservations", {
      reservation_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      room_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "customers", key: "id" },
      },
      amount_paid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      checking_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkout_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      staff_checked_in: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "staff", key: "id" },
      },
      staff_checked_out: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "staff", key: "id" },
      },
      time_checked_out: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      total_amount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("reservations");
  },
};
