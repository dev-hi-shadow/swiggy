import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IRDeals } from "./types";

export class RDeals
  extends Model<IRDeals, CreationAttrs<IRDeals>>
  implements IRDeals
{
  declare id: number;
  declare deal_id: number;
  declare restaurant_id: number;
  declare created_at: Date;
  declare updated_at: Date;
  static associate(models: any) {
    //
  }
}

RDeals.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    deal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: "r_deals",
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
  }
);
