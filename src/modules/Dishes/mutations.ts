import { GraphQLList } from "graphql";
import { formatResponseType } from "../../utils/typeDefs";
import { CreateDishInputType, DishType } from "./typeDefs";
import { getArguments } from "../../utils";
import { IDish } from "./types";
import { Context } from "../../types";
import sequelize from "../../configs/mysql";
import { ThrowError } from "../../utils/ThrowError";
import { CreateOrUpdateDish } from "./services";



export const createDish = {
  type: formatResponseType("createDish", DishType),
  args: getArguments({
    outputType: CreateDishInputType,
  }),
  resolve: async (parent: any, args: any, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;
      args = { ...args, created_by: user?.id, updated_by: user?.id };
      const dish = await CreateOrUpdateDish(args, transaction);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
