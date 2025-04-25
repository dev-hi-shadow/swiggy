import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { GraphQLDate } from "../../utils/typeDefs";
import { RoleType } from "../Roles/typeDefs";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    phone: { type: GraphQLString },
    gender: { type: GraphQLString },
    dob: { type: GraphQLDate },
    aadhar_card: { type: GraphQLString },
    pan_card: { type: GraphQLString },
    voter_id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role_id: { type: GraphQLInt },
    is_active: { type: GraphQLBoolean },
    is_verified: { type: GraphQLBoolean },
    profile_picture: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zip_code: { type: GraphQLInt },
    last_login_at: { type: GraphQLDate },
    login_count: { type: GraphQLInt },
    device_token: { type: GraphQLString },
    wallet_balance: { type: GraphQLFloat },
    referral_code: { type: GraphQLInt },
    referred_by: { type: GraphQLInt },
    otp_code: { type: GraphQLInt },
    otp_expiry: { type: GraphQLDate },
    blocked_reason: { type: GraphQLString },
    language_preference: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    created_by: { type: GraphQLInt },
    updated_by: { type: GraphQLInt },
    deleted_by: { type: GraphQLInt },
    terms_conditions_accepted: { type: GraphQLBoolean },
    role: { type: RoleType },
  }),
});

export const UsersResponse = new GraphQLObjectType({
  name: "UsersResponse",
  fields: () => ({
    message: { type: GraphQLString },
    data: {
      type: new GraphQLObjectType({
        name: "Users",
        fields: () => ({
          count: { type: GraphQLInt },
          rows: { type: new GraphQLList(UserType) },
        }),
      }),
    },
  }),
});
