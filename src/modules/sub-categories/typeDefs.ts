import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLDate } from "../../utils/typeDefs";

export const CategoryType = new GraphQLObjectType({
  name: "SubCategory",
  fields: () => ({
    id: { type: GraphQLInt },
    category_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    short_description: { type: GraphQLString },
    long_description: { type: GraphQLString },
    image: { type: GraphQLString },
    banner_image: { type: GraphQLString },
    icon: { type: GraphQLString },
    display_order: { type: GraphQLInt },
    is_featured: { type: GraphQLBoolean },
    is_active: { type: GraphQLBoolean },
    seo_title: { type: GraphQLString },
    seo_description: { type: GraphQLString },
    seo_keywords: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    created_by: { type: GraphQLInt },
    updated_by: { type: GraphQLInt },
    deleted_by: { type: GraphQLInt },
  }),
});

