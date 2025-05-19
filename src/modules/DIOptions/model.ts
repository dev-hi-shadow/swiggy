import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IDIOption } from "./types";

export class DIOption
  extends Model<IDIOption, CreationAttrs<IDIOption>>
  implements IDIOption
{
  declare id: number;
  declare title: string;
  declare price: number;
  declare is_default: boolean;
  declare is_available: boolean;
  declare customization_id: number;
  declare order: number;
  declare calories: number;

  static associate(models: any) {
    DIOption.belongsTo(models.DCustomization, {
      as: "option",
      foreignKey: "customization_id",
    });
  }
}

DIOption.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "d_customizations", key: "id" },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "di_options",
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
  }
);
