import { GraphQLList } from "graphql";
import { formatResponse, getArguments } from "../../utils";
import { formatResponseType } from "../../utils/typeDefs";
import { SubCategoryType } from "./typeDefs";
import { ISubcategory } from "./types";
import { Context } from "../../types";
import { ThrowError } from "../../utils/ThrowError";
import { GetSubCategories } from "./services";

export const subCategoriesList = {
  type: formatResponseType(
    "SubCategoriesList",
    new GraphQLList(SubCategoryType)
  ),
  args: getArguments<ISubcategory>({
    outputType: SubCategoryType,
    includes: ["category_id"],
  }),
  resolve: async (params: any, args: ISubcategory, context: Context) => {
    try {
      const data = await GetSubCategories(args);
      return formatResponse({
        data,
        message: "Subcategory fetched successfully",
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};

export const getSubcategoryById = {
  type: formatResponseType("SubCategoryById", SubCategoryType),
  args: getArguments<ISubcategory>({
    outputType: SubCategoryType,
    includes: ["id"],
  }),
  resolve: async (params: any, args: ISubcategory, context: Context) => {
    try {
      const data = await GetSubCategories(args);
      return formatResponse({
        data,
        message: "Subcategory fetched successfully",
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
