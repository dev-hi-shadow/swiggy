'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable("dc_options", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customization_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "d_customizations", key: "id" },
      onDelete: "CASCADE",
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    is_default: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_available: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    calories: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    order: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });
 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("dc_options");
  }
};
