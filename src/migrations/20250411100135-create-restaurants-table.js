"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("restaurants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      name: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      image: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      phone_number: { type: Sequelize.STRING },
      alternate_phone_number: { type: Sequelize.STRING },
      website_url: { type: Sequelize.STRING },
      facebook_url: { type: Sequelize.STRING },
      instagram_url: { type: Sequelize.STRING },

      gst_number: { type: Sequelize.STRING },
      fssai_license_number: { type: Sequelize.STRING },

      is_chain: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      founded_year: { type: Sequelize.INTEGER },
      total_branches: { type: Sequelize.INTEGER },

      cuisine_types: { type: Sequelize.JSON },
      tags: { type: Sequelize.JSON },

      average_rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      total_reviews: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      approval_status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      approval_notes: { type: Sequelize.TEXT },

      timezone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Asia/Kolkata",
      },
      external_integration_id: { type: Sequelize.STRING },
      priority_order: { type: Sequelize.INTEGER },
      visibility_status: {
        type: Sequelize.ENUM("visible", "hidden"),
        allowNull: false,
        defaultValue: "visible",
      },
      cancellation_policy: { type: Sequelize.TEXT },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      updated_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      deleted_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("restaurants");
  },
};
