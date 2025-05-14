"use strict";
/** @type {import('sequelize-cli').Migration} */

// Sequelize Migration for 'dishes' table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("dishes", {
      // Core identifiers
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "r_branches",
          key: "id",
        },
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
      subcategory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sub_categories",
          key: "id",
        },
      },
      parent_dish_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {},
      },

      // Basic details
      name: { type: Sequelize.STRING, allowNull: false },
      slug: Sequelize.STRING,
      description: Sequelize.TEXT,
      long_description: Sequelize.TEXT,
      image: Sequelize.STRING,
      banner_image: Sequelize.STRING,
      gallery_images: Sequelize.TEXT,
      video_url: Sequelize.STRING,
      tags: Sequelize.TEXT,

      // Pricing
      price: { type: Sequelize.FLOAT, allowNull: false },
      original_price: Sequelize.FLOAT,
      currency: { type: Sequelize.STRING, allowNull: false },
      price_unit: Sequelize.ENUM(
        "per_item",
        "per_kg",
        "per_litre",
        "per_person"
      ),
      tax_percentage: Sequelize.FLOAT,
      tax_inclusive: Sequelize.BOOLEAN,
      service_charge_percentage: Sequelize.FLOAT,
      packaging_charge: Sequelize.FLOAT,

      // Discounts
      discount_type: {
        type: Sequelize.ENUM("fixed", "percentage"),
        allowNull: false,
      },
      discount_amount: Sequelize.FLOAT,
      discount_amount_upto: Sequelize.FLOAT,
      discount_percentage: Sequelize.FLOAT,
      discount_start_time: Sequelize.STRING,
      discount_end_time: Sequelize.STRING,
      discount_max_quantity: Sequelize.INTEGER,
      discount_min_quantity: Sequelize.INTEGER,
      discount_max_quantity_per_user: Sequelize.INTEGER,
      discount_min_quantity_per_user: Sequelize.INTEGER,
      discount_max_quantity_per_order: Sequelize.INTEGER,
      discount_min_quantity_per_order: Sequelize.INTEGER,
      discount_max_quantity_per_user_per_order: Sequelize.INTEGER,
      discount_min_quantity_per_user_per_order: Sequelize.INTEGER,
      discount_applies_with_coupon: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      promo_code_applicable: Sequelize.BOOLEAN,

      // Availability & timing
      is_available: { type: Sequelize.BOOLEAN, allowNull: false },
      availability_days: Sequelize.TEXT,
      availability_start_time: Sequelize.STRING,
      availability_end_time: Sequelize.STRING,
      blackout_dates: Sequelize.TEXT,
      preorder_available: Sequelize.BOOLEAN,
      preorder_hours: Sequelize.INTEGER,
      delivery_eta_minutes: Sequelize.INTEGER,
      delivery_buffer_minutes: Sequelize.INTEGER,
      preparation_time_minutes: Sequelize.INTEGER,

      // Quantity & inventory
      stock_quantity: Sequelize.INTEGER,
      min_order_qty: Sequelize.INTEGER,
      max_order_qty: Sequelize.INTEGER,
      available_portions: Sequelize.INTEGER,

      // Dietary & customizations
      is_veg: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_customizable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      spicy_level: Sequelize.ENUM("mild", "medium", "hot"),
      dietary_tags: Sequelize.TEXT,
      allergen_info: Sequelize.JSON,
      allergens: Sequelize.TEXT,
      ingredients: Sequelize.TEXT,

      // Add-ons & variants

      meal_time_tags: Sequelize.TEXT,

      // Attributes / visibility
      featured: Sequelize.BOOLEAN,
      is_featured: Sequelize.BOOLEAN,
      is_new: Sequelize.BOOLEAN,
      is_popular: Sequelize.BOOLEAN,
      is_recommended: Sequelize.BOOLEAN,
      is_best_seller: Sequelize.BOOLEAN,
      is_chef_special: Sequelize.BOOLEAN,

      // Ordering channels
      is_available_for_delivery: Sequelize.BOOLEAN,
      is_available_for_pickup: Sequelize.BOOLEAN,
      is_available_for_dine_in: Sequelize.BOOLEAN,
      is_available_for_takeaway: Sequelize.BOOLEAN,

      // Regional / localization
      language_tags: Sequelize.JSON,
      regional_exclusivity: Sequelize.JSON,
      cuisine_type: Sequelize.TEXT,
      name_translations: Sequelize.JSON,
      description_translations: Sequelize.JSON,

      // SEO & marketing
      seo_title: Sequelize.STRING,
      seo_description: Sequelize.STRING,
      promo_tags: Sequelize.TEXT,
      share_url: Sequelize.STRING,

      // Ratings & analytics
      rating: Sequelize.FLOAT,
      total_reviews: Sequelize.INTEGER,
      average_rating: Sequelize.FLOAT,
      total_orders: Sequelize.INTEGER,
      reorder_rate: Sequelize.FLOAT,
      cart_additions: Sequelize.INTEGER,
      view_count: Sequelize.INTEGER,
      conversion_rate: Sequelize.FLOAT,
      user_likes_count: Sequelize.INTEGER,
      order_count: Sequelize.INTEGER,
      reorder_probability: Sequelize.FLOAT,
      smart_tags: Sequelize.TEXT,

      // Kitchen / operations
      kitchen_station: Sequelize.STRING,
      priority_order: Sequelize.INTEGER,
      shelf_life_hours: Sequelize.INTEGER,
      is_ready_to_eat: Sequelize.BOOLEAN,

      // Compliance
      approval_status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      rejection_reason: Sequelize.STRING,
      fssai_info: Sequelize.JSON,

      // AI / ML
      auto_tags: Sequelize.TEXT,

      // Audit
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: Sequelize.DATE,
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      updated_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      deleted_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("dishes");
  },
};
