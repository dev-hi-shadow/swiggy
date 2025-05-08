import { GraphQLInt, GraphQLNonNull } from "graphql";
import { RoleType } from "./typeDefs";
import { formatResponse, getArguments } from "../../utils/";
import sequelize from "../../configs/mysql";
import { CreateOrUpdateRole, DeleteRole } from "./services";
import { IRole } from "./types";
import { ThrowError } from "../../utils/ThrowError";
import { Authenticate } from "../../middlewares/Authenticate";
import { formatResponseType } from "../../utils/typeDefs";
import { Context } from "../../types";

export const createRole = {
  type: formatResponseType("createRole", RoleType),
  args: getArguments<IRole>({
    outputType: RoleType,
    exclude: ["id"],
  }),
  resolve: Authenticate(
    async (_: unknown, { name, permissions }: IRole) => {
      const transaction = await sequelize.transaction();
      try {
        const role = await CreateOrUpdateRole(
          { name, permissions },
          transaction
        );
        await transaction.commit();
        return formatResponse({
          message: "Role created successfully",
          data: role?.toJSON(),
        });
      } catch (err: any) {
        await transaction.rollback();
        throw new ThrowError(500, err.message);
      }
    },
    [
      { resource: "roles", actions: ["read", "update", "write"] }
    ]
  ),
};
export const updateRole = {
  type: formatResponseType("updateRole", RoleType),
  args: getArguments<IRole>({
    outputType: RoleType,
  }),
  resolve: Authenticate(
    async (_: unknown, args: IRole, context: Context) => {
      const transaction = await sequelize.transaction();
      try {
        const { user } = context.req;
        args = { ...args, updated_by: user.id };
        const role = await CreateOrUpdateRole(args, transaction);
        await transaction.commit();
        return formatResponse({
          message: "Role updated successfully",
          data: role?.toJSON(),
        });
      } catch (err: any) {
        await transaction.rollback();
        throw new ThrowError(500, err.message);
      }
    },
    [
      // { resource: "roles", actions: ["read", "update", "write"] }
    ]
  ),
};

export const deleteRole = {
  type: RoleType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_: unknown, { id }: { id: number }) => {
    const transaction = await sequelize.transaction();
    try {
      await DeleteRole(id, transaction);
      await transaction.commit();
      return formatResponse({
        message: "Role deleted successfully",
        data: null,
      });
    } catch (err: any) {
      await transaction.rollback();
      throw new ThrowError(500, err.message);
    }
  },
};
