import { GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { formatResponseType } from "../../utils/typeDefs";
import { DishType } from "./typeDefs";
import { IDish } from "./types";
import { Context } from "../../types";
import { Authenticate } from "../../middlewares/Authenticate";
import { getDishes } from "./services";
import { getArguments } from "../../utils";

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
