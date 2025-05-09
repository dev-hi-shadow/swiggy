"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("deals", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      banner_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      scope: {
        type: Sequelize.ENUM("dish", "category", "restaurant", "branch"),
        allowNull: false,
      },
      scope_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      discount_type: {
        type: Sequelize.ENUM(
          "percentage",
          "flat",
          "bogo",
          "bxgy",
          "free_delivery",
          "free_item"
        ),
        allowNull: false,
      },
      discount_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      min_order_amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      max_discount_amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      target_dish_ids: {
        type: Sequelize.STRING,
      },

      buy_quantity: {
        type: Sequelize.INTEGER,
      },
      get_quantity: {
        type: Sequelize.INTEGER,
      },
      get_dish_ids: {
        type: Sequelize.STRING,
      },
      user_limit: {
        type: Sequelize.INTEGER,
      },

      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      usage_limit_per_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_usage_limit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        OnDelete: "CASCADE",
        OnUpdate: "CASCADE",
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        OnDelete: "CASCADE",
        OnUpdate: "CASCADE",
      },
      deleted_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        OnDelete: "CASCADE",
        OnUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("deals");
  },
};
