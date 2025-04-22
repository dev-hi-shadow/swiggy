import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { formatResponseType, GraphQLDate } from "../../utils/typeDefs";

export const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLInt },
    created_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    name: { type: GraphQLString },
    permissions: { type: GraphQLJSONObject },
  }),
});
export const RolesResponse = formatResponseType(
  "Roles",
  new GraphQLList(RoleType)
);

export const RoleResponse = formatResponseType("Role", RoleType);
