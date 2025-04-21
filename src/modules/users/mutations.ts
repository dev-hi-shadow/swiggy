import sequelize from "../../configs/mysql";
import { Authenticate } from "../../middlewares/Authenticate";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import { createOrUpdateUser, deleteUserById, getUserByQuery } from "./services";
import { UserType } from "./typeDefs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GraphQLString } from "graphql";
import { IUser } from "./types";

export const createUser = {
  type: formatResponseType("CreateUser", UserType),
  args: getArguments<IUser>({
    outputType: UserType,
    exclude: [
      "id",
      "created_at",
      "updated_at",
      "deleted_at",
      "created_by",
      "deleted_by",
      "updated_by",
    ],
  }),
  resolve: Authenticate(
    async (parent: any, args: any, context: Context) => {
      const transaction = await sequelize.transaction();
      try {
        const { user } = context.req;
        const { username } = args;

        const userExists = await getUserByQuery({ username });
        if (userExists) {
          throw new ThrowError(400, "User already exists with this username");
        }

        const data = await createOrUpdateUser(
          {
            ...args,
            created_by: user.id ?? null,
          },
          transaction
        );
        await transaction.commit();
        if (!data) {
          throw new ThrowError(400, "Something went wrong");
        }
        return formatResponse({
          message: "User created successfully",
          data,
          status: 201,
        });
      } catch (error) {
        await transaction.rollback();
        throw new ThrowError(400, (error as Error)?.message);
      }
    },
    [{ resource: "users", actions: ["read", "write"] }]
  ),
};

export const updateUser = {
  type: formatResponseType("UpdateUser", UserType),
  args: getArguments<IUser>({
    outputType: UserType,
    exclude: [
      "id",
      "created_at",
      "updated_at",
      "deleted_at",
      "created_by",
      "deleted_by",
      "updated_by",
    ],
  }),
  resolve: Authenticate(
    async (parent: any, args: any, context: Context) => {
      const transaction = await sequelize.transaction();
      try {
        const { user } = context.req;
        const { body } = args;
        const { id } = body;
        const userExists = await getUserByQuery({ id });
        if (!userExists) {
          throw new ThrowError(400, "User not found");
        }
        const data = await createOrUpdateUser(
          { ...args, updated_by: user.id ?? null },
          transaction
        );
        await transaction.commit();
        if (!data) {
          throw new ThrowError(400, "Something went wrong");
        }
        return formatResponse({
          message: "User updated successfully",
          data,
          status: 201,
        });
      } catch (error) {
        await transaction.rollback();
        throw new ThrowError(400, (error as Error)?.message);
      }
    },
    [{ resource: "users", actions: ["update", "write", "read"] }]
  ),
};

export const deleteUser = {
  type: formatResponseType("DeleteUser"),
  args: getArguments<IUser>({
    outputType: UserType,
    includes: ["id"],
  }),
  resolve: Authenticate(
    async (parent: any, args: any, context: Context) => {
      const transaction = await sequelize.transaction();
      try {
        const { user } = context.req;
        const { id } = args;
        const userExists = await getUserByQuery({ id });
        if (!userExists) {
          throw new ThrowError(400, "User not found");
        }
        const data = await deleteUserById(
          { id, deleted_by: Number(user.id) },
          transaction
        );
        await transaction.commit();
        if (!data) {
          throw new ThrowError(400, "Something went wrong");
        }
        return formatResponse({
          message: "User deleted successfully",
          data,
          status: 201,
        });
      } catch (error) {
        await transaction.rollback();
        throw new ThrowError(400, (error as Error)?.message);
      }
    },
    [{ resource: "user", actions: ["delete"] }]
  ),
};

export const login = {
  type: formatResponseType("Login", null, { token: { type: GraphQLString } }),
  args: getArguments<IUser>({
    outputType: UserType,
    includes: ["username", "password"],
  }),
  resolve: async (parent: any, args: any, context: Context) => {
    try {
      const { username, password } = args;
      const user = await getUserByQuery({ username });
      if (!user) {
        throw new ThrowError(400, "User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new ThrowError(400, "Invalid password");
      }
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      return formatResponse({
        message: "Login successful",
        data: { token },
        status: 200,
      });
    } catch (error) {
      throw new ThrowError(400, (error as Error)?.message);
    }
  },
};

export const register = {
  type: formatResponseType("Register", null, {
    token: { type: GraphQLString },
  }),
  args: getArguments<IUser>({
    outputType: UserType,
    exclude: [
      "id",
      "created_at",
      "updated_at",
      "deleted_at",
      "created_by",
      "deleted_by",
      "updated_by",
    ],
  }),
  resolve: async (
    parent: any,
    { username, password }: { username: string; password: string },
    context: Context
  ) => {
    const transaction = await sequelize.transaction();
    try {
      const user = await getUserByQuery({ username });
      if (user) {
        throw new ThrowError(400, "User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await createOrUpdateUser(
        {
          username,
          password: hashedPassword,
        },
        transaction
      );
      if (!data) {
        throw new ThrowError(400, "Something went wrong");
      }
      await transaction.commit();
      return formatResponse({
        message: "User created successfully",
        data,
        status: 201,
      });
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(400, (error as Error)?.message);
    }
  },
};
