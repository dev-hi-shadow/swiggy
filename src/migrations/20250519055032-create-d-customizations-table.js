"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("d_customizations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dish_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "dishes", key: "id" },
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      min_selection: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      max_selection: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      selection_type: {
        type: Sequelize.ENUM("single", "multiple"),
        defaultValue: "single",
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("d_customizations");
  },
};
