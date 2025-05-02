import { resolve } from "path";
import sequelize from "../../configs/mysql";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import { CreateOrUpdateCategory, DeleteCategory } from "./services";
import { CategoryType } from "./typeDefs";
import { ICategory } from "./types";
import { Authenticate } from "../../middlewares/Authenticate";

export const createCategory = {
  type: formatResponseType("createCategory", CategoryType),
  args: getArguments<ICategory>({
    outputType: CategoryType,
    nullables: [
      "banner_image",
      "display_order",
      "icon",
      "image",
      "is_active",
      "is_featured",
      "long_description",
      "seo_description",
      "short_description",
      "seo_keywords",
      "seo_title",
    ],
  }),
  resolve: async (parent: any, args: ICategory, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;
      args = { ...args, created_by: user.id };
      const data = await CreateOrUpdateCategory(args, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: "Category created successfully",
        isToast: false,
      });
    } catch (error) {
      console.log("🚀 ~ resolve: ~ error:", error)
      await transaction.rollback();
      throw new ThrowError(500, (error as Error).message);
    }
  },
};

export const updateCategory = {
  type: formatResponseType("updateCategory", CategoryType),
  args: getArguments<ICategory>({
    outputType: CategoryType,
    nullables: Object.keys({
      all: "",
    } as unknown as ICategory) as (keyof ICategory)[],
  }),
  resolve: Authenticate(
    async (parent: any, args: ICategory, context: Context) => {
      console.log("🚀 ~ resolve: ~ args:", args);
      const transaction = await sequelize.transaction();
      try {
        const { user } = context.req;
        args = { ...args, updated_by: user.id };
        const data = await CreateOrUpdateCategory(args, transaction);
        await transaction.commit();
        return formatResponse({
          data,
          message: "Category updated successfully",
          isToast: false,
        });
      } catch (error) {
        console.log("🚀 ~ resolve: ~ error:", error);
        await transaction.rollback();
        throw new ThrowError(500, (error as Error).message);
      }
    },
    [{ resource: "category", actions: ["read", "update", "write"] }]
  ),
};

export const deleteCategory = {
  type: formatResponseType("deleteCategory"),
  args: getArguments<ICategory>({
    outputType: CategoryType,
    includes: ["id"],
  }),
  resolve: async (parent: any, args: ICategory, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;
      const data = await DeleteCategory(args.id, user, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: "Category updated successfully",
        isToast: false,
      });
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
