import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IDCustomization } from "./types";

export class DCustomization
  extends Model<IDCustomization, CreationAttrs<IDCustomization>>
  implements IDCustomization
{
  declare id: number;
  declare dish_id: number;
  declare title: string;
  declare is_required: boolean;
  declare min_selection: number;
  declare max_selection: number;
  declare selection_type: "single" | "multiple";
  declare order: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date | null;

  static associate(models: any) {
    //
  }
}

DCustomization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "dishes", key: "id" },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    min_selection: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    max_selection: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    selection_type: {
      type: DataTypes.ENUM("single", "multiple"),
      defaultValue: "single",
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "d_customizations",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeDestroy: async (instance: any, options: any) => {
        const { deleted_by, transaction } = options;
        if (deleted_by) {
          instance.setDataValue("deleted_by", deleted_by);
          await instance.save({ transaction });
        }
      },
    },
  }
);
