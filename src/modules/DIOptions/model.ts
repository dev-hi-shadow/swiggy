import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IDIOption } from "./types";

export class DIOption
  extends Model<IDIOption, CreationAttrs<IDIOption>>
  implements IDIOption
{
  declare id: number;
  declare name: string;
  declare price: number;
  declare ingredient_id: number;
  declare description?: string;
  declare image_url?: string;
  declare created_at: Date;
  declare updated_at: Date;
  static associate(models: any) {
    //
  }
}

DIOption.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "d_ingredients",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
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
  },
  {
    sequelize,
    tableName: "di_options",
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
  }
);
