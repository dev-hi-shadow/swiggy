import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../configs/mysql"; // your config
import { IRole } from "./types"; // path to your types

interface CreationAttributes
  extends Optional<
    IRole,
    | "description"
    | "permissions"
    | "is_active"
    | "created_by"
    | "updated_by"
    | "deleted_by"
    | "deleted_at"
  > {}

export class Role extends Model<IRole, CreationAttributes> implements IRole {
  declare id: number;
  declare name: string;
  declare description?: string | null;
  declare permissions: Record<string, any>;
  declare is_active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;
  declare created_by?: number | null;
  declare updated_by?: number | null;
  declare deleted_by?: number | null;
  declare is_admin: boolean;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING(500), allowNull: true },
    permissions: { type: DataTypes.JSON, allowNull: true, defaultValue: {} },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    tableName: "roles",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  }
);
