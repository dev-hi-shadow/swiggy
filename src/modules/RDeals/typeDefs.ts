import { GraphQLInt, GraphQLObjectType } from "graphql";
import { GraphQLDate } from "../../utils/typeDefs";

export const RDealsType = new GraphQLObjectType({
  name: "RDeals",
  fields: () => ({
    id: { type: GraphQLInt },
    deal_id: { type: GraphQLInt },
    restaurant_id: { type: GraphQLInt },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
  }),
});
