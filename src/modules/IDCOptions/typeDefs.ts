import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import { GraphQLDate } from "../../utils/typeDefs";

const commonFields = {
  id: { type: GraphQLInt },
  customization_id: { type: GraphQLInt },
  title: { type: GraphQLString },
  price: { type: GraphQLInt },
  order: { type: GraphQLInt },
  createdAt: { type: GraphQLDate },
  updatedAt: { type: GraphQLDate },
  deletedAt: { type: GraphQLDate },
};

export const IDCOptionInputType = new GraphQLInputObjectType({
  name: "IDCOptionInput",
  fields: () => commonFields,
});