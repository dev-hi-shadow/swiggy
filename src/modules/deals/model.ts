import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import {  IDeal} from "./types";

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
    discount_type: {
      type: DataTypes.ENUM("percentage", "flat"),
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
