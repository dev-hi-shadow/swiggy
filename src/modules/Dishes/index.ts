import { createDish, updateDish } from "./mutations";
import { dishList, getDishById } from "./queries";

export default {
  Query: { dishList, getDishById },
  Mutation: { createDish, updateDish },
};
