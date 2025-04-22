import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLDate } from "../../utils/typeDefs";
import { DIOptionInputType, DIOptionTypes } from "../DIOptions/typeDefs";

export const DIngredientsType = new GraphQLObjectType({
  name: "DIngredients",
  fields: () => ({
    id: { type: GraphQLInt },
    dish_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    image_url: { type: GraphQLString },
    has_options: { type: GraphQLBoolean },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    options: { type: new GraphQLList(DIOptionTypes) },
  }),
});


 