import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { IRestaurant } from "./types";
import { CreationAttrs } from "../../types";

export class Restaurants
  extends Model<IRestaurant, CreationAttrs<IRestaurant>>
  implements IRestaurant
{
  declare id: number;
  declare owner_id: number;
  declare name: string;
  declare slug: string;
  declare description: string;
  declare image: string;
  declare email: string;
  declare cuisine_types?: string[];
  declare tags?: string[];
  declare website?: string;
  declare gst_number?: string;
  declare fssai_license_number?: string;
  declare bank_account_number?: string;
  declare bank_ifsc_code?: string;
  declare status?: "pending" | "approved" | "rejected";
  declare rejection_reason?: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;
  declare created_by?: number | null;
  declare updated_by?: number | null;
  declare deleted_by?: number | null;

  static associate(models: any) {
    // Define associations here later
  }
}

Restaurants.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cuisine_types: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gst_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fssai_license_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank_account_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank_ifsc_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    rejection_reason: {
      type: DataTypes.STRING,
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
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "restaurants",
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
