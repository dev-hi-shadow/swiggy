import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IDCOption } from "./types";

export class DCOption
  extends Model<IDCOption, CreationAttrs<IDCOption>>
  implements IDCOption
{
  declare id: number;
  declare customization_id: number;
  declare title: string;
  declare image: string;
  declare price: number;
  declare is_default: boolean;
  declare is_available: boolean;
  declare calories?: number | null;
  declare order: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date | null;

  static associate(models: any) {
    //
  }
}

DCOption.init(
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
    image: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "dc_options",
    freezeTableName: true,
    timestamps: false,
    paranoid: false,
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
