import sequelize from "../../configs/mysql";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import { CreateRDeal, DeleteRDeal, GetRDeal } from "./services";
import { RDealsType } from "./typeDefs";
import { IRDeals } from "./types";

export const createRDeal = {
  type: formatResponseType("createRDeal", RDealsType),
  args: getArguments<IRDeals>({
    outputType: RDealsType,
    exclude: ["id"],
  }),
  resolve: async (parent: any, args: IRDeals, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const data: IRDeals = await CreateRDeal(args, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: `${data?.deal?.title} created for ${data?.restaurant?.name}`,
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};

export const deleteRDeals = {
  type: formatResponseType("deleteRDeal", RDealsType),
  args: getArguments<IRDeals>({
    outputType: RDealsType,
    includes: ["id"],
  }),
  resolve: async (parent: any, args: IRDeals, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const r_deal: IRDeals = (await GetRDeal(args?.id)) as IRDeals;

      const data = await DeleteRDeal(args.id, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: `${r_deal?.deal?.title}  has been removed from ${r_deal?.restaurant?.name}`,
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
