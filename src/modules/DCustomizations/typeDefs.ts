import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
 import { GraphQLDate } from "../../utils/typeDefs";
import { IDCOptionInputType, IDCOptionType } from "../DCOptions/typeDefs";

 

const commonFields = {
  id: { type: GraphQLInt },
  dish_id: { type: GraphQLInt },
  title: { type: GraphQLString },
  is_required: { type: GraphQLBoolean },
  min_selection: { type: GraphQLInt },
  max_selection: { type: GraphQLInt },
  selection_type: { type: GraphQLString },
  order: { type: GraphQLInt },
};

export const DCustomizationType = new GraphQLObjectType({
  name: "DCustomization",
  fields: () => ({
    ...commonFields,
    options: { type: new GraphQLList(IDCOptionType) },
  }),
});

export const DCustomizationInputType = new GraphQLInputObjectType({
  name: "DCusDCustomization",
  fields: () => ({
    ...commonFields,
    options: { type: IDCOptionInputType },
  }),
});
