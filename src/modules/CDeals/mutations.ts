import sequelize from "../../configs/mysql";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { formatResponseType } from "../../utils/typeDefs";
import { GetCategories } from "../Categories/services";
import { ICategory } from "../Categories/types";
import { CreateCDeal, DeleteCDeal, GetCDeal } from "./services";
import { CDealsType } from "./typeDefs";
import { ICDeals } from "./types";

export const createCDeal = {
  type: formatResponseType("createCDeal", CDealsType),
  args: getArguments<ICDeals>({
    outputType: CDealsType,
    exclude: ["id"],
  }),
  resolve: async (parent: any, args: ICDeals, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const category: ICategory = (await GetCategories(
        args.category_id
      )) as ICategory;
      if (!category) {
        throw new ThrowError(404, "Category not found");
      }
      const data: ICDeals = await CreateCDeal(args, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: `${data?.deal?.title} created for ${data?.category?.name}`,
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};

export const deleteCDeals = {
  type: formatResponseType("deleteCDeal", CDealsType),
  args: getArguments<ICDeals>({
    outputType: CDealsType,
    includes: ["id"],
  }),
  resolve: async (parent: any, args: ICDeals, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const c_deal: ICDeals = (await GetCDeal(args?.id)) as ICDeals;
      const data = await DeleteCDeal(args.id, transaction);
      await transaction.commit();
      return formatResponse({
        data,
        message: `${c_deal?.deal?.title}  has been removed from ${c_deal?.category?.name}`,
      });
    } catch (error) {
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
