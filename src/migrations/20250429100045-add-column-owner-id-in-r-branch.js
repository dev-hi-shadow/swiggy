"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("r_branches", "owner_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      after: "id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("r_branches", "owner_id");
  },
};
