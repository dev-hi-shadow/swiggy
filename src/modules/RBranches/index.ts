import { getBranchById, getBranchByRestaurantId, RBranchList } from "./queries";
import { createBranch, updateBranch, deleteBranch } from "./mutations";

export default {
  Query: { RBranchList, getBranchById, getBranchByRestaurantId },
  Mutation: { createBranch, updateBranch, deleteBranch },
};
