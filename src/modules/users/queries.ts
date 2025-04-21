import { Authenticate } from "../../middlewares/Authenticate";
import { formatResponse } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { getUsers } from "./services";
import { UsersResponse, UserType } from "./typeDefs";

export const list = {
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
  type: UserType,
  resolve: Authenticate(
    async (req: any, args: any) => {
      try {
        const user = await getUsers(req.user_id);
        return formatResponse({
          message: "profile fetched successfully",
          data: user,
          isToast: false,
        });
      } catch (error: any) {
        throw new ThrowError(500, error?.message);
      }
    },
    [{ resource: "users", actions: ["read"] }]
  ),
};
