import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { RoleResponse, RolesResponse, RoleType } from "./typeDefs";
import { Role } from "../../models";
import { formatResponse, getArguments } from "../../utils/";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import { GetRoles } from "./services";
import { Authenticate } from "../../middlewares/Authenticate";
import { IRole } from "./types";

export const roleList = {
  type: formatResponseType("roleList", new GraphQLList(RoleType)),
  resolve: Authenticate(async () => {
    try {
      const roles = await GetRoles();
      return formatResponse({
        message: "Roles fetched successfully",
        data: roles,
      });
    } catch (err: any) {
      throw new ThrowError(500, err?.message);
    }
  }, []),
};

export const getRoleById = {
  type: formatResponseType(`getRoleById`, RoleType),
  args: getArguments<IRole>({
    outputType: RoleType,
    includes: ["id"],
  }),
  resolve: Authenticate(async (_: unknown, { id }: { id: number }) => {
    try {
      const role = await Role.findByPk(id);
      return formatResponse({
        message: "Role fetched successfully",
        data: role,
      });
    } catch (err: any) {
      throw new ThrowError(500, err?.message);
    }
  }, []),
};
