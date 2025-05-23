import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import { formatResponseType, GraphQLDate } from "../../utils/typeDefs";
import { RestaurantType } from "../Restaurants/typeDefs";
import { UserType } from "../Users/typeDefs";

const commonFields = {
  id: { type: GraphQLInt },
    description: { type: GraphQLString },
    restaurant_id: { type: GraphQLInt },
    owner_id: { type: GraphQLInt },
    manager_id: { type: GraphQLInt },
    location: { type: GraphQLString },
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat },
    image: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    alternate_phone_number: { type: GraphQLString },
    expected_delivery_time: { type: GraphQLString },
    average_price_for_one: { type: GraphQLInt },
    average_price_for_two: { type: GraphQLInt },
    delivery_charge: { type: GraphQLInt },
    min_order_value: { type: GraphQLInt },
    max_order_value: { type: GraphQLInt },
    packaging_charge: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    is_open: { type: GraphQLBoolean },
    is_featured: { type: GraphQLBoolean },
    is_available_for_delivery: { type: GraphQLBoolean },
    is_available_for_pickup: { type: GraphQLBoolean },
    is_veg_only: { type: GraphQLBoolean },
    opening_time: { type: GraphQLString },
    closing_time: { type: GraphQLString },
    special_opening_time: { type: GraphQLString },
    special_closing_time: { type: GraphQLString },
    average_preparation_time: { type: GraphQLString },
    slug: { type: GraphQLString },
    short_description: { type: GraphQLString },
    full_description: { type: GraphQLString },
    gst_number: { type: GraphQLString },
    fssai_license_number: { type: GraphQLString },
    service_radius_km: { type: GraphQLFloat },
    approval_status: { type: GraphQLString },
    approval_notes: { type: GraphQLString },
    cancellation_policy: { type: GraphQLString },
    external_integration_id: { type: GraphQLString },
    timezone: { type: GraphQLString },
    country: { type: GraphQLString },
    state: { type: GraphQLString },
    city: { type: GraphQLString },
    zip_code: { type: GraphQLString },
    landmark: { type: GraphQLString },
    block_floor_number: { type: GraphQLInt },
    nearby_landmark: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    created_by: { type: GraphQLInt },
    updated_by: { type: GraphQLInt },
    deleted_by: { type: GraphQLInt },
}

export const BranchType = new GraphQLObjectType({
  name: "RBranch",
  fields: () => commonFields,
});



export const BranchesResponse = formatResponseType(
  "Branches",
  new GraphQLList(
    new GraphQLObjectType({
      name: "Branches",
      fields: () => ({
        ...commonFields,
        restaurant: { type: RestaurantType },
        owner: { type: UserType },
        manager: { type: UserType },
      }),
    })
  )
);

export const getBranchesByRestaurantId = formatResponseType(
  "getBranchesByRestaurantId",
  new GraphQLList(BranchType)
);
export const BranchResponse = formatResponseType("Branch", BranchType);
export const getBranchByIdResponse = formatResponseType(
  "BranchById",
  BranchType
);

