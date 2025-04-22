import { GraphQLList } from "graphql";
import { formatResponse, getArguments } from "../../utils";
import { formatResponseType } from "../../utils/typeDefs";
import { CategoryType } from "./typeDefs";
import { ThrowError } from "../../utils/ThrowError";
import { GetCategories } from "./services";
import { ICategory } from "./types";

export const categoryList = {
  type: formatResponseType("CategoryList", new GraphQLList(CategoryType)),
  resolve: async (parent: any, args: any, context: any) => {
    try {
      const data = await GetCategories();
      return formatResponse({
        data,
        message: "Categories fetched successfully",
        isToast: false,
      });
    } catch {
      throw new ThrowError();
    }
  },
};

export const getCategoryById = {
  type: formatResponseType("CategoryById", CategoryType),
  args: getArguments<ICategory>({
    outputType: CategoryType,
    includes: ["id"],
  }),
  resolve: async (parent: any, args: ICategory, context: any) => {
    try {
      const data = await GetCategories(args.id);
      return formatResponse({
        data,
        message: "Category fetched successfully",
        isToast: false,
      });
    } catch {
      throw new ThrowError();
    }
  },
};
