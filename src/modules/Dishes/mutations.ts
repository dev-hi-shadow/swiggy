import { formatResponseType } from "../../utils/typeDefs";
import { CreateDishInputType, DishType } from "./typeDefs";
import { formatResponse, getArguments } from "../../utils";
import { IDish, nullable } from "./types";
import { Context } from "../../types";
import sequelize from "../../configs/mysql";
import { ThrowError } from "../../utils/ThrowError";
import { CreateOrUpdateDish } from "./services";

export const createDish = {
  type: formatResponseType("createDish", DishType),
  args: getArguments<IDish>({
    outputType: CreateDishInputType,
    exclude: ["id"],
    nullables: nullable,
  }),
  resolve: async (parent: any, args: any, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;
      args = { ...args, created_by: user?.id, updated_by: user?.id };
      const dish = await CreateOrUpdateDish(args, transaction);
      await transaction.commit();
      return formatResponse({
        message: "Dish created successfully",
        data: dish,
      });
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
export const updateDish = {
  type: formatResponseType("updateDish", DishType),
  args: getArguments<IDish>({
    outputType: CreateDishInputType,
    nullables: Object.keys({ all: "" }) as unknown as (keyof IDish)[],
  }),
  resolve: async (parent: any, args: any, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;
      args = { ...args, created_by: user?.id, updated_by: user?.id };
      const dish = await CreateOrUpdateDish(args, transaction, true);
      await transaction.commit();
      return formatResponse({
        message: "Dish updated successfully",
        data: dish,
      });
    } catch (error) {
      await transaction.rollback();
      throw new ThrowError(500, (error as Error).message);
    }
  },
};
