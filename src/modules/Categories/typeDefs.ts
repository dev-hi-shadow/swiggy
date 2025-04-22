import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLDate } from "../../utils/typeDefs";

export const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    short_description: { type: GraphQLString },
    long_description: { type: GraphQLString },
    image: { type: GraphQLString },
    banner_image: { type: GraphQLString },
    icon: { type: GraphQLString },
    display_order: { type: GraphQLString },
    is_featured: { type: GraphQLBoolean },
    is_active: { type: GraphQLBoolean },
    seo_title: { type: GraphQLString },
    seo_description: { type: GraphQLString },
    seo_keywords: { type: new GraphQLList(GraphQLString) },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    created_by: { type: GraphQLInt },
    updated_by: { type: GraphQLInt },
    deleted_by: { type: GraphQLInt },
  }),
});
