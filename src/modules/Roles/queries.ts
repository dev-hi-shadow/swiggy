import { GraphQLInt, GraphQLNonNull } from "graphql";
import { RoleResponse, RolesResponse } from "./typeDefs";
import { Role } from "../../models";
import { formatResponse } from "../../utils/";
import { ThrowError } from "../../utils/ThrowError";

export const getAllRoles = {
  type: RolesResponse,
  resolve: async () => {
    try {
       const roles = await Role.findAll({});
      return formatResponse({
        message: "Roles fetched successfully",
        data: roles,
      });
    } catch (err: any) {
      throw new ThrowError(500, err?.message);
    }
  },
};

export const getRoleById = {
  type: RoleResponse,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_: unknown, { id }: { id: number }) => {
    try {
      const role = await Role.findByPk(id);
      return formatResponse({
        message: "Role fetched successfully",
        data: role,
      });
    } catch (err: any) {
      throw new ThrowError(500, err?.message);
    }
  },
};
