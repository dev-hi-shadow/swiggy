import { GraphQLInt, GraphQLObjectType } from "graphql";
import { GraphQLDate } from "../../utils/typeDefs";

export const RBDealsType = new GraphQLObjectType({
  name: "RBDeals",
  fields: () => ({
    id: { type: GraphQLInt },
    deal_id: { type: GraphQLInt },
    rbranch_id: { type: GraphQLInt },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
  }),
});