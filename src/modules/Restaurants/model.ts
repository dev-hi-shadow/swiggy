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
  declare name: string | null;
  declare slug: string | null;
  declare description: string | null;
  declare image: string | null;
  declare email: string | null;
  declare phone_number: string | null;
  declare alternate_phone_number: string | null;
  declare website_url: string | null;
  declare facebook_url: string | null;
  declare instagram_url: string | null;
  declare gst_number: string | null;
  declare status: string | null;
  declare rejection_reason: string | null;
  declare fssai_license_number: string | null;
  declare is_chain: boolean;
  declare founded_year: number | null;
  declare total_branches: number | null;
  declare cuisine_types: string | null;
  declare tags: string | null;
  declare average_rating: number;
  declare total_reviews: number;
  declare is_verified: boolean;
  declare approval_status: "pending" | "approved" | "rejected";
  declare approval_notes: string | null;
  declare timezone: string;
  declare external_integration_id: string | null;
  declare priority_order: number | null;
  declare visibility_status: "visible" | "hidden";
  declare cancellation_policy: string | null;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at: Date | null;
  declare created_by: number | null;
  declare updated_by: number | null;
  declare deleted_by: number | null;
  declare account_number: string | null;
  declare upi_id: string | null;
  declare swift_code: string | null;
  declare bank_name: string | null;
  declare bank_branch: string | null;
  declare ifsc_code: string | null;
  declare account_holder_name: string | null;

  static associate(models: any) {
    // Define associations here later
  }
}

Restaurants.init(
  {
    
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    rejection_reason: { type: DataTypes.STRING },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    name: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    alternate_phone_number: { type: DataTypes.STRING },
    website_url: { type: DataTypes.STRING },
    facebook_url: { type: DataTypes.STRING },
    instagram_url: { type: DataTypes.STRING },

    gst_number: { type: DataTypes.STRING },
    fssai_license_number: { type: DataTypes.STRING },

    is_chain: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    founded_year: { type: DataTypes.INTEGER },
    total_branches: { type: DataTypes.INTEGER },

    cuisine_types: { type: DataTypes.JSON },
    tags: { type: DataTypes.JSON },

    average_rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_reviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    approval_status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    approval_notes: { type: DataTypes.TEXT },

    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Asia/Kolkata",
    },
    external_integration_id: { type: DataTypes.STRING },
    priority_order: { type: DataTypes.INTEGER },
    visibility_status: {
      type: DataTypes.ENUM("visible", "hidden"),
      allowNull: false,
      defaultValue: "visible",
    },
    cancellation_policy: { type: DataTypes.TEXT },
    account_number: { type: DataTypes.STRING, allowNull: true },
    upi_id: { type: DataTypes.STRING, allowNull: true },
    swift_code: { type: DataTypes.STRING, allowNull: true },
    bank_name: { type: DataTypes.STRING, allowNull: true },
    bank_branch: { type: DataTypes.STRING, allowNull: true },
    ifsc_code: { type: DataTypes.STRING, allowNull: true },
    account_holder_name: { type: DataTypes.STRING, allowNull: true },

    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    created_by: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    deleted_by: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
