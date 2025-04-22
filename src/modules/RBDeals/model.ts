import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/mysql";
import { CreationAttrs } from "../../types";
import { IRBDeals } from "./types";

export class RBDeals
  extends Model<IRBDeals, CreationAttrs<IRBDeals>>
  implements IRBDeals
{
  declare id: number;
  declare deal_id: number;
  declare rbranch_id: number;
  declare created_at: Date;
  declare updated_at: Date;
  static associate(models: any) {
    //
  }
}

RBDeals.init(
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
    rbranch_id: {
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
    tableName: "rb_deals",
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
  }
);
