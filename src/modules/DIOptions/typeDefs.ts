import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLDate } from "../../utils/typeDefs";

export const DIOptionTypes = new GraphQLObjectType({
  name: "DIOption",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    ingredient_id: { type: GraphQLInt },
    description: { type: GraphQLString },
    image_url: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
  }),
});

// DIngredients Input Type
export const DIOptionInputType = new GraphQLInputObjectType({
  name: "DIOptionInput",
  fields: () => ({
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
    image_url: { type: GraphQLString },
  }),
});
