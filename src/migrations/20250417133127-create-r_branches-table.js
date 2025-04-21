"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("r_branches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "restaurants",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      // Core Branch Info
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alternate_phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // Pricing and Delivery
      expected_delivery_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      average_price_for_one: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      average_price_for_two: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      delivery_charge: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      min_order_value: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      max_order_value: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      packaging_charge: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      // Ratings and Availability
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      is_open: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_available_for_delivery: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_available_for_pickup: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_veg_only: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      // Timing
      opening_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      closing_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      special_opening_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      special_closing_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      average_preparation_time: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      // SEO and Content
      slug: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      short_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      full_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Legal and Regulatory
      gst_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fssai_license_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // Logistics
      service_radius_km: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      // Admin Control
      approval_status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      approval_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cancellation_policy: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Extra System Fields
      external_integration_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "Asia/Kolkata",
      },

      // Soft Delete and Audit
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
    await queryInterface.dropTable("r_branches");
  },
};
