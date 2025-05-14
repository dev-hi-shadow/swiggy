import {
  BranchesResponse,
  BranchType,
  getBranchByIdResponse,
  getBranchesByRestaurantId,
} from "./typeDefs";
 import { GetBranchById, GetRBranches } from "./services";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponse, getArguments, getDefaultArgs } from "../../utils";
import { IRBranch } from "./types";
import { Authenticate } from "../../middlewares/Authenticate";
import { Context } from "../../types";

export const RBranchList = {
  type: BranchesResponse,
  args: {
    ...getDefaultArgs,
    ...getArguments<IRBranch>({
      outputType: BranchType,
      includes: ["restaurant_id"],
    }),
  },
  resolve: Authenticate(
    async (parent: any, args: any, context: Context) => {
      try {
        const { user } = context.req;
        const data = await GetRBranches(user, args.restaurant_id);
        return formatResponse({
          message: "branches fetched successfully",
          data,
          isToast: false,
        });
      } catch (error) {
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
