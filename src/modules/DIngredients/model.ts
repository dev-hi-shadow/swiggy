import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IDIngredient } from "./types";

export class DIngredients
  extends Model<IDIngredient, CreationAttrs<IDIngredient>>
  implements IDIngredient
{
  declare id: number;
  declare dish_id: number;
  declare name: string;
  declare image_url?: string;
  declare has_options: boolean;
  declare created_at: Date;
  declare updated_at: Date;
  static associate(models: any) {
    //
  }
}

DIngredients.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    dish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dishes",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    has_options: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "d_ingredients",
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
  }
);
