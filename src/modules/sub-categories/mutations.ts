import { resolve } from "path";
import sequelize from "../../configs/mysql";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import { ICategory } from "../categories/types";
import { CreateOrUpdateSubcategory, DeleteSubcategory } from "./services";
import { SubCategoryType } from "./typeDefs";
import { ISubcategory } from "./types";

export const createSubcategory = {
  type: formatResponseType("createSubcategory", SubCategoryType),
  args: getArguments<ISubcategory>({
    outputType: SubCategoryType,
    exclude: [
      "id",
      "created_at",
      "created_by",
      "updated_at",
      "updated_by",
      "deleted_at",
      "deleted_by",
    ],
    nullables: [
      "banner_image",
      "icon",
      "display_order",
      "image",
      "is_active",
      "is_featured",
      "long_description",
      "seo_description",
      "seo_keywords",
      "seo_title",
      "short_description",
      "slug",
    ],
  }),
  resolve: async (parent: any, args: ISubcategory, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;
      args = {
        ...args,
        created_by: user?.id,
      };
      const data = await CreateOrUpdateSubcategory(args, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: "Subcategory created successfully",
      });
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(500, (error as Error).message);
    }
  },
};

export const updateSubcategory = {
  type: formatResponseType("updateSubcategory", SubCategoryType),
  args: getArguments<ISubcategory>({
    outputType: SubCategoryType,
    nullables: Object.keys({
      all: "",
    }) as (keyof ISubcategory)[],
  }),
  resolve: async (parent: any, args: ISubcategory, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;
      args = {
        ...args,
        created_by: user?.id,
      };
      const data = await CreateOrUpdateSubcategory(args, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: "Subcategory updated successfully",
      });
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(500, (error as Error).message);
    }
  },
};

export const deleteSubcategory = {
  type: formatResponseType("deleteSubcategory"),
  args: getArguments<ISubcategory>({
    outputType: SubCategoryType,
    includes: ["id"],
  }),
  resolve: async (parent: any, args: ISubcategory, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;
      await DeleteSubcategory(args.id, user, transaction);
      await transaction.commit();
      return formatResponse({
        message: "Subcategory deleted successfully",
      });
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
