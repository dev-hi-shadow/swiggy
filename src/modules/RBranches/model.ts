import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IRBranch } from "./types";

export class RBranch
  extends Model<IRBranch, CreationAttrs<IRBranch>>
  implements IRBranch
{
  declare id: number;
  declare restaurant_id: number;
  declare manager_id: number;
  declare location: string;
  declare longitude: number;
  declare latitude: number;
  declare image: string;
  declare email: string;
  declare phone_number?: string;
  declare alternate_phone_number?: string;
  declare expected_delivery_time: string;
  declare average_price_for_one: number;
  declare average_price_for_two?: number;
  declare delivery_charge: number;
  declare min_order_value?: number;
  declare max_order_value?: number;
  declare packaging_charge?: number;
  declare rating: number;
  declare is_open: boolean;
  declare is_featured: boolean;
  declare is_available_for_delivery: boolean;
  declare is_available_for_pickup: boolean;
  declare is_veg_only: boolean;
  declare opening_time?: string;
  declare closing_time?: string;
  declare special_opening_time?: string;
  declare special_closing_time?: string;
  declare average_preparation_time?: string;
  declare slug?: string;
  declare short_description?: string;
  declare full_description?: string;
  declare gst_number?: string;
  declare fssai_license_number?: string;
  declare service_radius_km?: number;
  declare approval_status: "pending" | "approved" | "rejected";
  declare approval_notes?: string;
  declare cancellation_policy?: string;
  declare external_integration_id?: string;
  declare timezone: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;
  declare created_by?: number | null;
  declare updated_by?: number | null;
  declare deleted_by?: number | null;
  declare country: string;
  declare state: string;
  declare city: string;
  declare zip_code: string;
  declare landmark?: string;
  declare block_floor_number?: number;
  declare nearby_landmark?: string;

  static associate(models: any) {
    RBranch.belongsTo(models.Restaurants, {
      foreignKey: "restaurant_id",
      as: "restaurant",
    });
    RBranch.belongsTo(models.User, {
      foreignKey: "manager_id",
      as: "manager",
    });

    RBranch.belongsTo(models.User, {
      foreignKey: "owner_id",
      as: "owner",
    });
  }
}

RBranch.init(
  {
    id: {
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "restaurants",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alternate_phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    expected_delivery_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    average_price_for_one: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    average_price_for_two: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    delivery_charge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_order_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_order_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    packaging_charge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    is_open: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_available_for_delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    is_available_for_pickup: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    is_veg_only: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    opening_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closing_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    special_opening_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    special_closing_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    average_preparation_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    full_description: {
      type: DataTypes.TEXT,
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

    service_radius_km: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    approval_status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: true,
      defaultValue: "pending",
    },
    approval_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cancellation_policy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    external_integration_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Asia/Kolkata",
    },
    block_floor_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nearby_landmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "India",
    },
    created_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: true,
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
    tableName: "r_branches",
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
