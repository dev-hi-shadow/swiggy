import { GraphQLInputObjectType, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
 
const commonFields = {
  id: { type: GraphQLInt },
  customization_id: { type: GraphQLInt },
  title: { type: GraphQLString },
  price: { type: GraphQLInt },
  order: { type: GraphQLInt },
};

export const IDCOptionType = new GraphQLObjectType({
  name: "IDCOption",
  fields: () => ({
    ...commonFields,
  }),
});
export const IDCOptionInputType = new GraphQLInputObjectType({
  name: "IDCOptionInput",
  fields: () => commonFields,
});