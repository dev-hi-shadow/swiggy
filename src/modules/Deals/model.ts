import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IDeal } from "./types";

export class Deals extends Model<IDeal, CreationAttrs<IDeal>> implements IDeal {
  declare id: number;
  declare title: string;
  declare description?: string;
  declare banner_image?: string;
  declare discount_type: "percentage" | "flat";
  declare discount_value: number;
  declare min_order_amount?: number;
  declare max_discount_amount?: number;
  declare start_date: Date;
  declare end_date: Date;
  declare is_active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;
  declare created_by?: number | null;
  declare updated_by?: number | null;
  declare deleted_by?: number | null;
  declare target_dish_ids: number[] | string;
  declare buy_quantity: number;
  declare get_quantity: number;
  declare get_dish_ids: number[] | string;
  declare user_limit: number;
  declare scope: "dish" | "category" | "restaurant" | "branch";
  declare scope_id: number;
  declare usage_limit_per_user: number;
  declare total_usage_limit: number;

  static associate(models: any) {
    //
  }
}

Deals.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    banner_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    scope: {
      type: DataTypes.ENUM("dish", "category", "restaurant", "branch"),
      allowNull: false,
    },
    scope_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount_type: {
      type: DataTypes.ENUM(
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    min_order_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_discount_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    target_dish_ids: {
      type: DataTypes.STRING,
      set: function (val: number[]) {
        this.setDataValue("get_dish_ids", val.join(","));
      },
      get: function () {
        const value = this.getDataValue("target_dish_ids");
        return value ? (value as string)?.split(",") : [];
      },
    },

    buy_quantity: {
      type: DataTypes.INTEGER,
    },
    get_quantity: {
      type: DataTypes.INTEGER,
    },
    get_dish_ids: {
      type: DataTypes.STRING,
      set: function (val: number[]) {
        this.setDataValue("get_dish_ids", val.join(","));
      },
      get: function () {
        const value = this.getDataValue("get_dish_ids");
        return value ? (value as string)?.split(",") : [];
      },
    },
    user_limit: {
      type: DataTypes.INTEGER,
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    usage_limit_per_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deleted_by: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    tableName: "deals",
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
