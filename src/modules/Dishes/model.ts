import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../configs/mysql"; // your config
import { IDish } from "./types"; // path to your types
import { IDIngredient } from "../DIngredients/types";

interface CreationAttributes
  extends Optional<
    IDish,
    | "branch_id"
    | "category_id"
    | "subcategory_id"
    | "slug"
    | "description"
    | "image"
    | "banner_image"
    | "original_price"
    | "discount_percentage"
    | "preparation_time_minutes"
    | "dietary_tags"
    | "ingredients"
    | "availability_start_time"
    | "availability_end_time"
    | "stock_quantity"
    | "min_order_qty"
    | "max_order_qty"
    | "rating"
    | "rejection_reason"
    | "deleted_at"
    | "created_by"
    | "updated_by"
    | "deleted_by"
  > {}

export class Dish extends Model<IDish, CreationAttributes> implements IDish {
  declare id: number;
  declare restaurant_id: number;
  declare branch_id: number | undefined;
  declare category_id: number | undefined;
  declare subcategory_id: number | undefined;
  declare name: string;
  declare slug: string | undefined;
  declare description: string | undefined;
  declare long_description: string | undefined;
  declare image: string | undefined;
  declare banner_image: string | undefined;
  declare gallery_images: string[] | undefined;
  declare video_url: string | undefined;
  declare tags: string[] | undefined;
  declare price: number;
  declare original_price: number | undefined;
  declare currency: string;
  declare price_unit: "per_item" | "per_kg" | "per_litre" | "per_person" | undefined;
  declare tax_percentage: number | undefined;
  declare tax_inclusive: boolean | undefined;
  declare service_charge_percentage: number | undefined;
  declare packaging_charge: number | undefined;
  declare discount_type: "percentage" | "fixed";
  declare discount_amount: number | undefined;
  declare discount_percentage: number | undefined;
  declare discount_start_time: string | undefined;
  declare discount_end_time: string | undefined;
  declare discount_max_quantity: number | undefined;
  declare discount_min_quantity: number | undefined;
  declare discount_max_quantity_per_user: number | undefined;
  declare discount_min_quantity_per_user: number | undefined;
  declare discount_max_quantity_per_order: number | undefined;
  declare discount_min_quantity_per_order: number | undefined;
  declare discount_max_quantity_per_user_per_order: number | undefined;
  declare discount_min_quantity_per_user_per_order: number | undefined;
  declare discount_applies_with_coupon: boolean | undefined;
  declare promo_code_applicable: boolean | undefined;
  declare is_available: boolean;
  declare availability_days: string[] | undefined;
  declare availability_start_time: string | undefined;
  declare availability_end_time: string | undefined;
  declare blackout_dates: string[] | undefined;
  declare preorder_available: boolean | undefined;
  declare preorder_hours: number | undefined;
  declare delivery_eta_minutes: number | undefined;
  declare delivery_buffer_minutes: number | undefined;
  declare preparation_time_minutes: number | undefined;
  declare stock_quantity: number | undefined;
  declare min_order_qty: number | undefined;
  declare max_order_qty: number | undefined;
  declare available_portions: number | undefined;
  declare is_veg: boolean;
  declare is_customizable: boolean;
  declare spicy_level: "mild" | "medium" | "hot" | undefined;
  declare dietary_tags: string[] | undefined;
  declare allergen_info: string[] | undefined;
  declare allergens: string[] | undefined;
  declare ingredients: string | undefined;
  declare addons_group_ids: number[] | undefined;
  declare variant_group_ids: number[] | undefined;
  declare combo_group_id: number | undefined;
  declare is_part_of_combo: boolean | undefined;
  declare meal_time_tags: ("breakfast" | "lunch" | "dinner" | "snack")[] | undefined;
  declare featured: boolean;
  declare is_featured: boolean;
  declare is_new: boolean;
  declare is_popular: boolean;
  declare is_recommended: boolean;
  declare is_best_seller: boolean;
  declare is_chef_special: boolean;
  declare is_available_for_delivery: boolean;
  declare is_available_for_pickup: boolean;
  declare is_available_for_dine_in: boolean;
  declare is_available_for_takeaway: boolean;
  declare language_tags: string[] | undefined;
  declare regional_exclusivity: string[] | undefined;
  declare cuisine_type: string[] | undefined;
  declare name_translations: Record<string, string> | undefined;
  declare description_translations: Record<string, string> | undefined;
  declare seo_title: string | undefined;
  declare seo_description: string | undefined;
  declare promo_tags: string[] | undefined;
  declare share_url: string | undefined;
  declare rating: number | undefined;
  declare total_reviews: number | undefined;
  declare average_rating: number | undefined;
  declare total_orders: number | undefined;
  declare reorder_rate: number | undefined;
  declare cart_additions: number | undefined;
  declare view_count: number | undefined;
  declare conversion_rate: number | undefined;
  declare user_likes_count: number | undefined;
  declare order_count: number | undefined;
  declare reorder_probability: number | undefined;
  declare smart_tags: string[] | undefined;
  declare kitchen_station: string | undefined;
  declare priority_order: number | undefined;
  declare shelf_life_hours: number | undefined;
  declare is_ready_to_eat: boolean | undefined;
  declare approval_status: "pending" | "approved" | "rejected";
  declare rejection_reason: string | undefined;
  declare fssai_info: { license_number: string; label_required: boolean; } | undefined;
  declare auto_tags: string[] | undefined;
  declare paired_dish_ids: number[] | undefined;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at: Date | null | undefined;
  declare created_by: number | null | undefined;
  declare updated_by: number | null | undefined;
  declare deleted_by: number | null | undefined;
  declare parent_dish_id: number | undefined;

  // Example of a method to calculate the discounted price
  calculateDiscountedPrice(): number {
    if (this.discount_type === "percentage" && this.discount_percentage) {
      return this.price - (this.price * this.discount_percentage) / 100;
    } else if (this.discount_type === "fixed" && this.discount_amount) {
      return this.price - this.discount_amount;
    }
    return this.price;
  }

  // Example of a method to check if the dish is available
  isCurrentlyAvailable(): boolean {
    const now = new Date();
    const startTime = this.availability_start_time ?
       new Date(`1970-01-01T${this.availability_start_time}Z`)
      : null;
    const endTime = this.availability_end_time ?
       new Date(`1970-01-01T${this.availability_end_time}Z`)
      : null;

    if (startTime && endTime) {
      const currentTime = new Date(
        `1970-01-01T${now.toISOString().split("T")[1]}`
      );
      return currentTime >= startTime && currentTime <= endTime;
    }
    return this.is_available;
  }

  // Example of a method to check if the dish is vegetarian
  isVegetarian(): boolean {
    return this.is_veg;
  }

  // Example of a method to get the full description
  getFullDescription(): string {
    return `${this.name} - ${this.description ?? "No description available."}`;
  }

  // Example of a method to calculate the estimated delivery time
  getEstimatedDeliveryTime(): number {
    return this.delivery_eta_minutes ?? 30;
  }
}



Dish.init(
  {
    // Core identifiers
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "r_branches",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sub_categories",
        key: "id",
      },
    },
    parent_dish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {},
    },

    // Basic details
    name: { type: DataTypes.STRING, allowNull: false },
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    long_description: DataTypes.TEXT,
    image: DataTypes.STRING,
    banner_image: DataTypes.STRING,
    gallery_images: DataTypes.JSON,
    video_url: DataTypes.STRING,
    tags: DataTypes.JSON,

    // Pricing
    price: { type: DataTypes.FLOAT, allowNull: false },
    original_price: DataTypes.FLOAT,
    currency: { type: DataTypes.STRING, allowNull: false },
    price_unit: DataTypes.ENUM("per_item", "per_kg", "per_litre", "per_person"),
    tax_percentage: DataTypes.FLOAT,
    tax_inclusive: DataTypes.BOOLEAN,
    service_charge_percentage: DataTypes.FLOAT,
    packaging_charge: DataTypes.FLOAT,

    // Discounts
    discount_type: {
      type: DataTypes.ENUM("fixed", "percentage"),
      allowNull: false,
    },
    discount_amount: DataTypes.FLOAT,
    discount_percentage: DataTypes.FLOAT,
    discount_start_time: DataTypes.STRING,
    discount_end_time: DataTypes.STRING,
    discount_max_quantity: DataTypes.INTEGER,
    discount_min_quantity: DataTypes.INTEGER,
    discount_max_quantity_per_user: DataTypes.INTEGER,
    discount_min_quantity_per_user: DataTypes.INTEGER,
    discount_max_quantity_per_order: DataTypes.INTEGER,
    discount_min_quantity_per_order: DataTypes.INTEGER,
    discount_max_quantity_per_user_per_order: DataTypes.INTEGER,
    discount_min_quantity_per_user_per_order: DataTypes.INTEGER,
    discount_applies_with_coupon: DataTypes.BOOLEAN,
    promo_code_applicable: DataTypes.BOOLEAN,

    // Availability & timing
    is_available: { type: DataTypes.BOOLEAN, allowNull: false },
    availability_days: DataTypes.JSON,
    availability_start_time: DataTypes.TIME,
    availability_end_time: DataTypes.STRING,
    blackout_dates: DataTypes.JSON,
    preorder_available: DataTypes.BOOLEAN,
    preorder_hours: DataTypes.INTEGER,
    delivery_eta_minutes: DataTypes.INTEGER,
    delivery_buffer_minutes: DataTypes.INTEGER,
    preparation_time_minutes: DataTypes.INTEGER,

    // Quantity & inventory
    stock_quantity: DataTypes.INTEGER,
    min_order_qty: DataTypes.INTEGER,
    max_order_qty: DataTypes.INTEGER,
    available_portions: DataTypes.INTEGER,

    // Dietary & customizations
    is_veg: { type: DataTypes.BOOLEAN, allowNull: false },
    is_customizable: { type: DataTypes.BOOLEAN, allowNull: false },
    spicy_level: DataTypes.ENUM("mild", "medium", "hot"),
    dietary_tags: DataTypes.JSON,
    allergen_info: DataTypes.JSON,
    allergens: DataTypes.JSON,
    ingredients: DataTypes.TEXT,
    ingredients_options: DataTypes.JSON,
    customization_groups: DataTypes.JSON,

    // Add-ons & variants
    addons_group_ids: DataTypes.JSON,
    variant_group_ids: DataTypes.JSON,
    combo_group_id: DataTypes.INTEGER,
    is_part_of_combo: DataTypes.BOOLEAN,
    meal_time_tags: DataTypes.JSON,

    // Attributes / visibility
    featured: DataTypes.BOOLEAN,
    is_featured: DataTypes.BOOLEAN,
    is_new: DataTypes.BOOLEAN,
    is_popular: DataTypes.BOOLEAN,
    is_recommended: DataTypes.BOOLEAN,
    is_best_seller: DataTypes.BOOLEAN,
    is_chef_special: DataTypes.BOOLEAN,

    // Ordering channels
    is_available_for_delivery: DataTypes.BOOLEAN,
    is_available_for_pickup: DataTypes.BOOLEAN,
    is_available_for_dine_in: DataTypes.BOOLEAN,
    is_available_for_takeaway: DataTypes.BOOLEAN,

    // Regional / localization
    language_tags: DataTypes.JSON,
    regional_exclusivity: DataTypes.JSON,
    cuisine_type: DataTypes.JSON,
    name_translations: DataTypes.JSON,
    description_translations: DataTypes.JSON,

    // SEO & marketing
    seo_title: DataTypes.STRING,
    seo_description: DataTypes.STRING,
    promo_tags: DataTypes.JSON,
    share_url: DataTypes.STRING,

    // Ratings & analytics
    rating: DataTypes.FLOAT,
    total_reviews: DataTypes.INTEGER,
    average_rating: DataTypes.FLOAT,
    total_orders: DataTypes.INTEGER,
    reorder_rate: DataTypes.FLOAT,
    cart_additions: DataTypes.INTEGER,
    view_count: DataTypes.INTEGER,
    conversion_rate: DataTypes.FLOAT,
    user_likes_count: DataTypes.INTEGER,
    order_count: DataTypes.INTEGER,
    reorder_probability: DataTypes.FLOAT,
    smart_tags: DataTypes.JSON,

    // Kitchen / operations
    kitchen_station: DataTypes.STRING,
    priority_order: DataTypes.INTEGER,
    shelf_life_hours: DataTypes.INTEGER,
    is_ready_to_eat: DataTypes.BOOLEAN,

    // Compliance
    approval_status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
    },
    rejection_reason: DataTypes.STRING,
    fssai_info: DataTypes.JSON,

    // AI / ML
    auto_tags: DataTypes.JSON,
    paired_dish_ids: DataTypes.JSON,

    // Audit
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: DataTypes.DATE,
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "dishes",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeDestroy: async (instance, options: any) => {
        const { deleted_by, transaction } = options;
        if (deleted_by) {
          instance.setDataValue("deleted_by", deleted_by);
          await instance.save({ transaction });
        }
      },
    },
  }
);
