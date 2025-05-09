import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from "graphql";
 import { GraphQLDate } from "../../utils/typeDefs";
import { IDCOptionInputType } from "../IDCOptions/typeDefs";

 

const commonFields = {
  id: { type: GraphQLInt },
  dish_id: { type: GraphQLInt },
  title: { type: GraphQLString },
  is_required: { type: GraphQLBoolean },
  min_selection: { type: GraphQLInt },
  max_selection: { type: GraphQLInt },
  selection_type: {
    type: new GraphQLEnumType({
      name: "SelectionType",
      values: {
        single: { value: "single" },
        multiple: { value: "multiple" },
      },
    }),
  },
  order: { type: GraphQLInt },
  createdAt: { type: GraphQLDate },
  updatedAt: { type: GraphQLDate },
  deletedAt: { type: GraphQLDate },
};

export const DCustomizationType = new GraphQLInputObjectType({
  name: "DCusDCustomization",
  fields: () => ({
    ...commonFields,
    options: { type: IDCOptionInputType },
  }),
});
