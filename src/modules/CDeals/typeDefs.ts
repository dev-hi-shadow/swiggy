import { GraphQLInt, GraphQLObjectType } from "graphql";
import { GraphQLDate } from "../../utils/typeDefs";

export const CDealsType = new GraphQLObjectType({
  name: "CDeals",
  fields: () => ({
    id: { type: GraphQLInt },
    deal_id: { type: GraphQLInt },
    category_id: { type: GraphQLInt },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
  }),
});