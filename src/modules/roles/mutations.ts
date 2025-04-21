import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { RoleType } from "./typeDefs";
import { formatResponse } from "../../utils/";
import sequelize from "../../configs/mysql";
import { CreateOrUpdateRole, DeleteRole } from "./services";
import { IRole } from "./types";
import { ThrowError } from "../../utils/ThrowError";

export const createOrUpdateRole = {
  type: RoleType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    permissions: { type: GraphQLJSONObject },
  },
  resolve: async (_: unknown, { name, permissions }: IRole) => {
    const transaction = await sequelize.transaction();
    try {
      const role = await CreateOrUpdateRole({ name, permissions }, transaction);
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
