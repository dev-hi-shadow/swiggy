import { Authenticate } from "../../middlewares/Authenticate";
import { Context } from "../../types";
import { formatResponse } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import { getUsers } from "./services";
import { UsersResponse, UserType } from "./typeDefs";

export const usersList = {
  type: UsersResponse,
  resolve: Authenticate(async () => {
    try {
      const users = await getUsers();
      return formatResponse({
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error: any) {
      throw new ThrowError(500, error?.message);
    }
  }, [{ resource: "users", actions: ["read"] }]),
};

export const getProfile = {
  type: formatResponseType("getProfile", UserType),
  resolve: Authenticate(
    async (parent: any, args: any, context: Context) => {
      try {
        const { user } = context.req;
          const data = await getUsers(user?.id);
         return formatResponse({
           message: "profile fetched successfully",
           data,
           isToast: false,
         });
      } catch (error: any) {
        throw new ThrowError(500, error?.message);
      }
    },
    [{ resource: "users", actions: ["read"] }]
  ),
};
