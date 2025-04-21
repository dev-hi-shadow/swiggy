import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat,  GraphQLList } from 'graphql';
// import { IRBranch } from "../RBranches"; 
import { formatResponseType, GraphQLDate } from '../../utils/typeDefs';

export const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    id: { type: GraphQLInt },
    owner_id: { type: GraphQLInt },
    manager_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    cuisine_types: { type: new GraphQLList(GraphQLString) },
    tags: { type: new GraphQLList(GraphQLString) },
    website: { type: GraphQLString },
    gst_number: { type: GraphQLString },
    fssai_license_number: { type: GraphQLString },
    bank_account_number: { type: GraphQLString },
    bank_ifsc_code: { type: GraphQLString },
    status: { type: GraphQLString },
    rejection_reason: { type: GraphQLString },
    // branches: { type: new GraphQLList(IRBranch) },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    location: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    pincode: { type: GraphQLString },
    phone: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    created_by: { type: GraphQLInt },
    updated_by: { type: GraphQLInt },
    deleted_by: { type: GraphQLInt },
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