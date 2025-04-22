import sequelize from "../../configs/mysql";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import { GetBranchById } from "../RBranches/services";
import { IRBranch } from "../RBranches/types";
import { CreateRBDeal, DeleteRBDeal, GetRBDeal } from "./services";
import { RBDealsType } from "./typeDefs";
import { IRBDeals } from "./types";

export const createRDeal = {
  type: formatResponseType("createDeal", RBDealsType),
  args: getArguments<IRBDeals>({
    outputType: RBDealsType,
    exclude: ["id"],
  }),
  resolve: async (parent: any, args: IRBDeals, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const branch: IRBranch = (await GetBranchById(
        args.rbranch_id,
        "branch"
      )) as IRBranch;

      if (!branch) {
        throw new ThrowError(404, "Branch not found");
      }
      const data: IRBDeals = await CreateRBDeal(args, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: `${data?.deal?.title} created for ${data?.r_branch?.restaurant?.name}(${data?.r_branch?.location})`,
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};

export const deleteRDeals = {
  type: formatResponseType("deleteRDeal", RBDealsType),
  args: getArguments<IRBDeals>({
    outputType: RBDealsType,
    includes: ["id"],
  }),
  resolve: async (parent: any, args: IRBDeals, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const rb_deal: IRBDeals = (await GetRBDeal(args?.id)) as IRBDeals;
      const data = await DeleteRBDeal(args.id, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: `${rb_deal?.deal?.title}  has been removed from ${rb_deal?.r_branch?.restaurant?.name}(${rb_deal?.r_branch?.location})`,
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
