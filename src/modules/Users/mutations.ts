import sequelize from "../../configs/mysql";
import { Authenticate } from "../../middlewares/Authenticate";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import {
  createOrUpdateUser,
  deleteUserById,
  getUserByQuery,
  getUsers,
} from "./services";
import { UserType } from "./typeDefs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GraphQLString } from "graphql";
import { IUser } from "./types";
import { Op } from "sequelize";
import moment from "moment";

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
        const { id } = args;
        const { user } = context.req;
        const userExists = await getUserByQuery({ id });
        if (!userExists) {
          throw new ThrowError(400, "User not found");
        }
        const data = await createOrUpdateUser(
          { ...args, updated_by: user.id ?? null },
          transaction,
          true
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
    const transaction = await sequelize.transaction();
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

      await createOrUpdateUser(
        {
          id: user?.id,
          device_token: token,
          last_login_at: moment().toDate(),
        },
        transaction
      );
      await transaction.commit();
      return formatResponse({
        message: "Login successful",
        data: { token },
        status: 200,
      });
    } catch (error) {
      await transaction.rollback();
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
  resolve: async (parent: any, args: IUser, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const query = {
        [Op.or]: [{ email: args?.email }],
      };
      const user = await getUserByQuery(query);
      if (user) {
        throw new ThrowError(400, "User already exists");
      }

      const hashedPassword = await bcrypt.hash(args?.password, 10);
      args = {
        ...args,
        username: `${args?.first_name}_${args?.last_name}`,
        password: hashedPassword,
      };
      const data = (await createOrUpdateUser(args, transaction)) as IUser;
      if (!data) {
        throw new ThrowError(400, "Something went wrong");
      }
      const token = jwt.sign(
        { id: data.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "8d",
        }
      );

      await createOrUpdateUser(
        {
          id: data?.id,
          device_token: token,
          last_login_at: moment().toDate(),
        },
        transaction
      );
      await transaction.commit();
      return formatResponse({
        message: "User created successfully",
        data,
        status: 201,
        token,
      });
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(400, (error as Error)?.message);
    }
  },
};
