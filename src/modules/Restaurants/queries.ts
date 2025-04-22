import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import {
  RestaurantResponse,
  RestaurantsResponse,
  RestaurantType,
} from "./typeDefs";
import { IRestaurant } from "./types";
import { getRestaurants } from "./services";
import { Authenticate } from "../../middlewares/Authenticate";

export const RestaurantList = {
  type: RestaurantsResponse,
  resolve: Authenticate(async () => {
    try {
      const roles = await getRestaurants();
      return formatResponse({
        message: "Restaurants fetched successfully",
        data: roles,
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
    async (parent: any, args: any) => {
      const { id } = args;
      try {
        const roles = await getRestaurants(id);
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
