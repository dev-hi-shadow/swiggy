import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat,  GraphQLList, GraphQLBoolean } from 'graphql';
 import { BranchType } from "../RBranches/typeDefs"; 
import { formatResponseType, GraphQLDate } from '../../utils/typeDefs';
import { UserType } from '../Users/typeDefs';

export const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    id: { type: GraphQLInt },
    owner_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    alternate_phone_number: { type: GraphQLString },
    website_url: { type: GraphQLString },
    facebook_url: { type: GraphQLString },
    instagram_url: { type: GraphQLString },
    gst_number: { type: GraphQLString },
    status: { type: GraphQLString },
    rejection_reason: { type: GraphQLString },
    fssai_license_number: { type: GraphQLString },
    is_chain: { type: GraphQLBoolean },
    founded_year: { type: GraphQLString },
    total_branches: { type: GraphQLInt },
    cuisine_types: { type: GraphQLString },
    tags: { type: GraphQLString },
    average_rating: { type: GraphQLFloat },
    total_reviews: { type: GraphQLInt },
    is_verified: { type: GraphQLBoolean },
    approval_status: { type: GraphQLString },
    approval_notes: { type: GraphQLString },
    timezone: { type: GraphQLString },
    external_integration_id: { type: GraphQLInt },
    priority_order: { type: GraphQLInt },
    visibility_status: { type: GraphQLString },
    cancellation_policy: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    created_by: { type: GraphQLInt },
    updated_by: { type: GraphQLInt },
    deleted_by: { type: GraphQLInt },
    account_number: { type: GraphQLString },
    upi_id: { type: GraphQLString },
    swift_code: { type: GraphQLString },
    bank_name: { type: GraphQLString },
    bank_branch: { type: GraphQLString },
    ifsc_code: { type: GraphQLString },
    account_holder_name: { type: GraphQLString },
    branches: { type: new GraphQLList(BranchType) },
    branch: { type: BranchType },
    owner: { type: UserType },
  }),
});




export const RestaurantsResponse = formatResponseType(
  "Restaurants",
  new GraphQLList(RestaurantType)
);
export const RestaurantResponse = formatResponseType(
  "Restaurant",
  RestaurantType
);