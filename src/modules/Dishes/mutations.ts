import { formatResponseType } from "../../utils/typeDefs";
import { CreateDishInputType, DishType } from "./typeDefs";
import { formatResponse, getArguments } from "../../utils";
import { IDish, nullable } from "./types";
import { Context } from "../../types";
import sequelize from "../../configs/mysql";
import { ThrowError } from "../../utils/ThrowError";
import { CreateOrUpdateDish } from "./services";
import { getRestaurantCount, getRestaurants } from "../Restaurants/services";
import { IRestaurant } from "../Restaurants/types";
import { getRBranchCount, GetRBranches } from "../RBranches/services";
import { IRBranch } from "../RBranches/types";

export const createDish = {
  type: formatResponseType("createDish", DishType),
  args: getArguments<IDish>({
    outputType: CreateDishInputType,
    exclude: ["id"],
    nullables: [...nullable, "customization_groups"],
  }),
  resolve: async (parent: any, args: any, context: Context) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = context.req;

      if (!args?.restaurant_id || !args?.branch_id) {
        if (!args?.restaurant_id) {
          const restaurantCount = await getRestaurantCount(user?.id);
          if (restaurantCount > 1 || restaurantCount < 1) {
            throw new ThrowError(400, "Please select a restaurant");
          }

          const restaurantsResult = await getRestaurants(undefined, user);
          const restaurants: IRestaurant[] = Array.isArray(restaurantsResult)
            ? restaurantsResult
            : [];
          if (!restaurants?.length) {
            throw new ThrowError(400, "Please select a restaurant");
          }
          args = { ...args, restaurant_id: restaurants[0]?.id };
        }

        if (!args?.branch_id) {
          const rBranchCount = await getRBranchCount({
            restaurant_id: args?.restaurant_id,
          });
          if (rBranchCount > 1 || rBranchCount < 1) {
            throw new ThrowError(400, "Please select a branch");
          }
          const rBranchesResult = await GetRBranches(user, args?.restaurant_id);
          const rBranches: IRBranch[] = Array.isArray(rBranchesResult)
            ? rBranchesResult
            : [];
          if (!rBranches?.length) {
            throw new ThrowError(400, "Please select a branch");
          }
          args = { ...args, branch_id: rBranches[0]?.id };
        }
      }

      args = { ...args, created_by: user?.id, updated_by: user?.id };
      const dish = await CreateOrUpdateDish(args, transaction);
      await transaction.commit();
      return formatResponse({
        message: "Dish created successfully",
        data: dish,
      });
    } catch (error) {
      console.log("🚀 ~ resolve: ~ error:", error)
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
