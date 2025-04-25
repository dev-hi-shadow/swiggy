import { DataTypes, DestroyOptions, Model, Optional } from "sequelize";
import sequelize from "../../configs/mysql";
import { IUser } from "./types";

interface CreationAttrs
  extends Optional<
    IUser,
    "deleted_at" | "created_by" | "updated_by" | "deleted_by"
  > {}

export class User extends Model<IUser, CreationAttrs> implements IUser {
  declare id: number;
  declare username: string;
  declare phone: string;
  declare gender?: string;
  declare dob?: Date;
  declare aadhar_card?: string;
  declare pan_card?: string;
  declare voter_id?: string;
  declare first_name?: string;
  declare last_name?: string;
  declare email?: string;
  declare password: string;
  declare role_id: number;
  declare is_active: boolean;
  declare is_verified: boolean;
  declare profile_picture?: string;
  declare address?: string;
  declare city?: string;
  declare state?: string;
  declare country?: string;
  declare zip_code?: string;
  declare last_login_at?: Date;
  declare login_count?: number;
  declare device_token?: string;
  declare wallet_balance?: number;
  declare referral_code?: string;
  declare referred_by?: string;
  declare otp_code?: string;
  declare otp_expiry?: Date;
  declare blocked_reason?: string;
  declare language_preference?: string;
  declare terms_conditions_accepted: boolean;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;
  declare created_by?: number | null;
  declare updated_by?: number | null;
  declare deleted_by?: number | null;

  public toJSON<T>(): object | T {
    const values = { ...this.get() } as any;
    delete values.password;
    return values;
  }
  static associate(models: any) {
    User.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    aadhar_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pan_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    voter_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
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
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blocked_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language_preference: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    login_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    device_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wallet_balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    referral_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referred_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    terms_conditions_accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeDestroy: async (
        instance,
        options: DestroyOptions & { deleted_by?: number }
      ) => {
        if (options.deleted_by) {
          instance.setDataValue("deleted_by", options.deleted_by);
          await instance.save();
        }
      },
    },
  }
);
