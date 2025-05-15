import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
 import { formatResponseType, GraphQLDate } from "../../utils/typeDefs";
import { GraphQLJSONObject } from "graphql-type-json";

export const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLInt },
    created_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    is_admin: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    permissions: { type: GraphQLJSONObject },
  }),
});
export const RolesResponse = formatResponseType(
  "Roles",
  new GraphQLList(RoleType)
);

export const RoleResponse = formatResponseType("Role", RoleType);
