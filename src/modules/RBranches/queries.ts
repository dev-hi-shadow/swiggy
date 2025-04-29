import {
  BranchesResponse,
  BranchType,
  getBranchByIdResponse,
  getBranchesByRestaurantId,
} from "./typeDefs";
import { Context } from "vm";
import { GetBranchById, GetRBranches } from "./services";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponse, getArguments } from "../../utils";
import { IRBranch } from "./types";
import { Authenticate } from "../../middlewares/Authenticate";

export const RBranchList = {
  type: BranchesResponse,
  resolve: Authenticate(
    async (parent: any, args: any, context: Context) => {
      try {
        const { user } = context.req;
        const data = await GetRBranches(user);
        console.log("🚀 ~ data:", data)
        return formatResponse({
          message: "branches fetched successfully",
          data,
          isToast: false,
        });
      } catch (error) {
        console.log("🚀 ~ error:", error)
        throw new ThrowError(500, (error as Error).message);
      }
    },
    [{ resource: "restaurants", actions: ["read"] }]
  ),
};
export const getBranchById = {
  type: getBranchByIdResponse,
  args: getArguments<IRBranch>({
    outputType: BranchType,
    includes: ["id"],
  }),
  resolve: async (parent: any, args: any, context: Context) => {
    try {
      const data = await GetBranchById(args.id);
      return formatResponse({
        message: "branches fetched successfully",
        data,
        isToast: false,
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
export const getBranchByRestaurantId = {
  type: getBranchesByRestaurantId,
  args: getArguments<IRBranch>({
    outputType: BranchType,
    includes: ["restaurant_id"],
  }),
  resolve: async (parent: any, args: any, context: Context) => {
    try {
      const data = await GetBranchById(args.restaurant_id, "restaurant");
      return formatResponse({
        message: "branches fetched successfully",
        data,
        isToast: false,
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
