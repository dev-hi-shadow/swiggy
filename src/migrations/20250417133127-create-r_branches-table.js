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
        allowNull: true,
        references: {
          model: "restaurants",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
        allowNull: true,
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
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
        type: Sequelize.STRING,
        allowNull: true,
      },
      average_price_for_one: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      average_price_for_two: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      delivery_charge: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
        allowNull: true,
      },
      is_open: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_available_for_delivery: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      is_available_for_pickup: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      is_veg_only: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },

      // Timing
      opening_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      closing_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      special_opening_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      special_closing_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      average_preparation_time: {
        type: Sequelize.STRING,
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
        allowNull: true,
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
      block_floor_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nearby_landmark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      landmark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "India",
      },

      // Soft Delete and Audit
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: true,
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
