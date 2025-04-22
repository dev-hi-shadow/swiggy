import { Role } from "../modules/roles/model";
import { User } from "../modules/users/model";
import { Restaurants } from "../modules/restaurants/model";
import _ from "lodash";
import { RBranch } from "../modules/RBranches/model";
import { Category } from "../modules/categories/model";
import { SubCategory } from "../modules/sub-categories/model";
import { Deals } from "../modules/deals/model";
import { RDeals } from "../modules/RDeals/model";
import { CDeals } from "../modules/CDeals/model";
import { RBDeals } from "../modules/RBDeals/model";

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
  RBDeals
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
};
