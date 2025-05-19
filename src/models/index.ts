import { Role } from "../modules/Roles/model";
import { User } from "../modules/Users/model";
import { Restaurants } from "../modules/Restaurants/model";
import _ from "lodash";
import { RBranch } from "../modules/RBranches/model";
import { Category } from "../modules/Categories/model";
import { SubCategory } from "../modules/Sub-categories/model";
import { Deals } from "../modules/Deals/model";
import { DCOption } from "../modules/DCOptions/model";
import { DCustomization } from "../modules/DCustomizations/model";
 
import { Dish } from "../modules/Dishes/model";


const db = {
  User,
  Role,
  Restaurants,
  RBranch,
  Category,
  SubCategory,
  Deals,
  Dish,
DCOption,
DCustomization
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
  Dish,
  DCOption,
  DCustomization,
};
