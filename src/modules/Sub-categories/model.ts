import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../configs/mysql"; // your config
import { ISubcategory } from "./types"; // path to your types
import _ from "lodash";

interface CreationAttributes
  extends Optional<
    ISubcategory,
    | "slug"
    | "short_description"
    | "long_description"
    | "image"
    | "banner_image"
    | "icon"
    | "display_order"
    | "seo_title"
    | "seo_description"
    | "seo_keywords"
    | "deleted_at"
    | "created_by"
    | "updated_by"
    | "deleted_by"
  > {}

export class SubCategory
  extends Model<ISubcategory, CreationAttributes>
  implements ISubcategory
{
  declare id: number;
  declare category_id: number;
  declare name: string;
  declare slug?: string;
  declare short_description?: string;
  declare long_description?: string;
  declare image?: string;
  declare banner_image?: string;
  declare icon?: string;
  declare display_order?: number;
  declare is_featured: boolean;
  declare is_active: boolean;
  declare seo_title?: string;
  declare seo_description?: string;
  declare seo_keywords?: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;
  declare created_by?: number | null;
  declare updated_by?: number | null;
  declare deleted_by?: number | null;
}

SubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    long_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      get(){
        return _.isArray(this.getDataValue("image"))
          ? this.getDataValue("image")
          : _.castArray(this.getDataValue("image"));
      }
    },
    banner_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    display_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    seo_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seo_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    seo_keywords: {
      type: DataTypes.STRING,
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
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "sub_categories",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeDestroy: async (instance, options: any) => {
        const { deleted_by, transaction } = options;
        if (deleted_by) {
          instance.setDataValue("deleted_by", deleted_by);
          await instance.save({ transaction });
        }
      },
    },
  }
);
