import { formatResponse, getArguments, getDefaultArgs } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import {
  RestaurantResponse,
  RestaurantsResponse,
  RestaurantType,
} from "./typeDefs";
import { IRestaurant } from "./types";
import { getRestaurants } from "./services";
import { Authenticate } from "../../middlewares/Authenticate";
import { Context } from "../../types";

export const RestaurantList = {
  type: RestaurantsResponse,
  args : getDefaultArgs,
  resolve: Authenticate(async (parent , args: any, context: Context) => {
    try {
      const { user } = context.req;
       const data = await getRestaurants(undefined, user);
       return formatResponse({
        message: "Restaurants fetched successfully",
        data,
      });
    } catch (err: any) {
      throw new ThrowError(500, err?.message);
    }
  }, [{ resource: "restaurants", actions: ["read"] }]),
};
export const restaurant = {
  type: RestaurantResponse,
  args: getArguments<IRestaurant>({
    outputType: RestaurantType,
    includes: ["id"],
  }),
  resolve: Authenticate(
    async (parent: any, args: any , context:Context) => {
      const { id } = args;
      try {
const { user } = context.req;
        const roles = await getRestaurants(id , user);
        return formatResponse({
          message: "Restaurants fetched successfully",
          data: roles,
        });
      } catch (err: any) {
        throw new ThrowError(500, err?.message);
      }
    },
    [{ resource: "restaurants", actions: ["read"] }]
  ),
};


