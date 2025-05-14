import { GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { formatResponseType } from "../../utils/typeDefs";
import { DishType, getDishByCategoriesResponseType } from "./typeDefs";
import { IDish } from "./types";
import { Context, IPagination } from "../../types";
import { Authenticate } from "../../middlewares/Authenticate";
import { getDishes, GetDishesByCategory } from "./services";
import { getArguments, getDefaultArgs } from "../../utils";

export const dishList = {
  type: formatResponseType(
    "dishList",
    new GraphQLObjectType({
      name: "dishList",
      fields() {
        return {
          count: { type: GraphQLInt },
          rows: { type: new GraphQLList(DishType) },
        };
      },
    })
  ),
  args: getDefaultArgs,
  resolve: Authenticate(
    async (parent: any, args: IDish, context: Context) => {
      const data = await getDishes();
      return {
        message: "Dishes fetched successfully",
        data,
      };
    },
    [{ resource: "dishes", actions: ["read"] }]
  ),
};

export const getDishById = {
  type: formatResponseType("getDishById", DishType),
  args: getArguments<IDish>({
    outputType: DishType,
    includes: ["id"],
  }),
  resolve: Authenticate(
    async (parent: any, args: IDish, context: Context) => {
      const data = await getDishes();
      return {
        message: "Dishes fetched successfully",
        data,
      };
    },
    [{ resource: "dishes", actions: ["read"] }]
  ),
};
export const getDishByCategories = {
  type: getDishByCategoriesResponseType,
  args: {
    ...getDefaultArgs,
    ...getArguments<IDish>({
      outputType: DishType,
      includes: ["category_id"],
    }),
  },
  resolve: Authenticate(
    async (parent: any, args: IPagination<IDish>, context: Context) => {
      const data = await GetDishesByCategory(args);
      console.log("🚀 ~ data:", data);
      return {
        message: "Dishes fetched successfully",
        data,
      };
    },
    [{ resource: "dishes", actions: ["read"] }]
  ),
};
