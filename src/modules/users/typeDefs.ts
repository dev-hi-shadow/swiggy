import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLType } from "graphql";
import { IUser } from "./types";
import { formatResponseType, GraphQLDate } from "../../utils/typeDefs";
import { formatResponse } from "../../utils";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    aadhar_card: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    created_by: { type: GraphQLInt },
    deleted_at: { type: GraphQLDate },
    deleted_by: { type: GraphQLInt },
    email: { type: GraphQLString },
    first_name: { type: GraphQLString },
    id: { type: GraphQLInt },
    last_name: { type: GraphQLString },
    dob: { type: GraphQLDate },
    phone: { type: GraphQLInt },
    gender: { type: GraphQLString },
    is_active: { type: GraphQLBoolean },
    is_verified: { type: GraphQLBoolean },
    pan_card: { type: GraphQLString },
    password: { type: GraphQLString },
    role_id: { type: GraphQLInt },
    updated_at: { type: GraphQLDate },
    updated_by: { type: GraphQLInt },
    username: { type: GraphQLString },
    voter_id: { type: GraphQLInt },
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
  

 