import { GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { formatResponse, getArguments, getDefaultArgs } from "../../utils";
import { formatResponseType } from "../../utils/typeDefs";
import { SubCategoryType } from "./typeDefs";
import { ISubcategory } from "./types";
import { Context } from "../../types";
import { ThrowError } from "../../utils/ThrowError";
import { GetSubCategories } from "./services";
import { Authenticate } from "../../middlewares/Authenticate";

export const subCategoriesList = {
  type: formatResponseType(
    "SubCategoriesList",
    new GraphQLObjectType({
      name: "subCategories",
      fields: () => ({
        count: { type: GraphQLInt },
        rows: { type: new GraphQLList(SubCategoryType) },
      }),
    })
  ),
  args: {
    ...getDefaultArgs,
    ...getArguments<ISubcategory>({
      outputType: SubCategoryType,
      includes: ["category_id"],
    }),
  },
  resolve: Authenticate(
    async (params: any, args: ISubcategory, context: Context) => {
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
    [{ resource: "sub_category", actions: ["read"] }]
  ),
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
