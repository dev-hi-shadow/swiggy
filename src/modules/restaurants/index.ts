import { createRestaurant , updateRestaurant } from "./mutations";
import { RestaurantList  , restaurant } from "./queries";

export default {
  Query: { RestaurantList, restaurant },
  Mutation: { createRestaurant, updateRestaurant },
};