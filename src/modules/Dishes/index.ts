import { createDish, updateDish } from "./mutations";
import { dishList, getDishByCategories, getDishById } from "./queries";

export default {
  Query: { dishList, getDishById, getDishByCategories },
  Mutation: { createDish, updateDish },
};
