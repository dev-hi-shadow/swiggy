import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../configs/mysql"; // your config
import { IDish } from "./types"; // path to your types

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
  declare branch_id?: number;
  declare category_id?: number;
  declare subcategory_id?: number;
  declare name: string;
  declare slug?: string;
  declare description?: string;
  declare image?: string;
  declare banner_image?: string;
  declare price: number;
  declare original_price?: number;
  declare currency: string;
  declare discount_percentage?: number;
  declare is_available: boolean;
  declare is_veg: boolean;
  declare is_customizable: boolean;
  declare spicy_level?: "mild" | "medium" | "hot";
  declare preparation_time_minutes?: number;
  declare dietary_tags?: string[];
  declare ingredients?: string;
  declare availability_start_time?: string;
  declare availability_end_time?: string;
  declare stock_quantity?: number;
  declare min_order_qty?: number;
  declare max_order_qty?: number;
  declare rating?: number;
  declare approval_status: "pending" | "approved" | "rejected";
  declare rejection_reason?: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;
  declare created_by?: number | null;
  declare updated_by?: number | null;
  declare deleted_by?: number | null;
}

Dish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "restaurants",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "r_branches",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "sub_categories",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banner_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    original_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "INR",
    },
    discount_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_veg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_customizable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    spicy_level: {
      type: DataTypes.ENUM("mild", "medium", "hot"),
      allowNull: true,
    },
    preparation_time_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dietary_tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    availability_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    availability_end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_order_qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_order_qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    approval_status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    rejection_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
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
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
