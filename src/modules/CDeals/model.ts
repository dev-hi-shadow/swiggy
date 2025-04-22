import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { ICDeals } from "./types";

export class CDeals
  extends Model<ICDeals, CreationAttrs<ICDeals>>
  implements ICDeals
{
  declare id: number;
  declare deal_id: number;
  declare category_id: number;
  declare created_at: Date;
  declare updated_at: Date;
  static associate(models: any) {
    //
  }
}

CDeals.init(
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
    category_id: {
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
    tableName: "c_deals",
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
  }
);
