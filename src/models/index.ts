import { Role } from "../modules/Roles/model";
import { User } from "../modules/Users/model";
import { Restaurants } from "../modules/Restaurants/model";
import _ from "lodash";
import { RBranch } from "../modules/RBranches/model";
import { Category } from "../modules/Categories/model";
import { SubCategory } from "../modules/Sub-categories/model";
import { Deals } from "../modules/Deals/model";
import { RDeals } from "../modules/RDeals/model";
import { CDeals } from "../modules/CDeals/model";
import { RBDeals } from "../modules/RBDeals/model";
import { Dish } from "../modules/Dishes/model";


const db = {
  User,
  Role,
  Restaurants,
  RBranch,
  Category,
  SubCategory,
  Deals,
  RDeals,
  CDeals,
  RBDeals,
  Dish
};

_.forEach(Object.values(db), (model: any) => {
  if (model.associate) model.associate(db);
});

export {
  User,
  Role,
  Restaurants,
  RBranch,
  Category,
  SubCategory,
  Deals,
  RDeals,
  CDeals,
  RBDeals,
  Dish,
};
