import { GraphQLError, GraphQLFieldResolver } from "graphql";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { Context } from "../types";
import { IUser } from "../modules/users/types";
import { IRole } from "../modules/roles/types";
import { getUsers } from "../modules/users/services";

type Action = "read" | "write" | "delete" | "update";

interface PermissionOptions {
  resource: keyof IRole["permissions"];
  actions: Action[];
}

export function Authenticate<TSource = any, TArgs = any>(
  resolver: GraphQLFieldResolver<TSource, Context, TArgs>,
  options: PermissionOptions[]
): GraphQLFieldResolver<TSource, Context, TArgs> {
  return async (parent, args, context, info) => {
    const authorization = context.req.headers?.authorization;

    if (!authorization) {
      throw new GraphQLError("No authorization token provided", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      throw new GraphQLError("Authorization token is missing", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      if (
        typeof decoded !== "object" ||
        decoded === null ||
        !("id" in decoded)
      ) {
        throw new GraphQLError("Invalid token payload", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const userId = decoded.id;
      const user: IUser = (await getUsers(userId)) as IUser;

      if (!user?.role) {
        throw new GraphQLError("User or role not found", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      context.req.user = { ...user, role: user.role };

      const rolePermissions = user.role.permissions || {};

      const hasAllPermissions = _.every(options, ({ resource, actions }) => {
        const allowedActions = _.get(rolePermissions, resource, []) as Action[];
        return _.every(actions, (action) => allowedActions.includes(action));
      });

      if (!hasAllPermissions) {
        throw new GraphQLError("Forbidden: Insufficient permissions", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      return resolver(parent, args, context, info);
    } catch (err) {
      console.error("Token verification failed:", err);
      throw new GraphQLError("Invalid token", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }
  };
}
