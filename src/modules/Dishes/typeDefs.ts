import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { GraphQLDate, GraphQLTime } from "../../utils/typeDefs";
import { UserType } from "../Users/typeDefs";
import { CategoryType } from "../Categories/typeDefs";
import { SubCategoryType } from "../Sub-categories/typeDefs";
import { BranchType } from "../RBranches/typeDefs";
import { DIngredientsType } from "../DIngredients/typeDefs";
import { getArguments } from "../../utils";

// --- Common Dish Fields ---
const commonDishFields = {
  id: { type: GraphQLInt },
  name: { type: GraphQLString },
  slug: { type: GraphQLString },
  description: { type: GraphQLString },
  image: { type: GraphQLString },
  banner_image: { type: GraphQLString },
  price: { type: GraphQLFloat },
  original_price: { type: GraphQLFloat },
  currency: { type: GraphQLString },
  discount_percentage: { type: GraphQLFloat },
  is_available: { type: GraphQLBoolean },
  is_veg: { type: GraphQLBoolean },
  is_customizable: { type: GraphQLBoolean },
  spicy_level: { type: GraphQLString },
  preparation_time_minutes: { type: GraphQLInt },
  dietary_tags: { type: GraphQLJSONObject },
  ingredients: { type: GraphQLString },
  availability_start_time: { type: GraphQLTime },
  availability_end_time: { type: GraphQLTime },
  stock_quantity: { type: GraphQLInt },
  min_order_qty: { type: GraphQLInt },
  max_order_qty: { type: GraphQLInt },
  rating: { type: GraphQLFloat },
  approval_status: { type: GraphQLString },
  rejection_reason: { type: GraphQLString },
  created_at: { type: GraphQLDate },
  updated_at: { type: GraphQLDate },
  deleted_at: { type: GraphQLDate },
};

export const DishType = new GraphQLObjectType({
  name: "Dish",
  fields: () => ({
    id: { type: GraphQLInt },
    restaurant_id: { type: GraphQLInt },
    branch_id: { type: BranchType },
    category_id: { type: CategoryType },
    subcategory_id: { type: SubCategoryType },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    banner_image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    original_price: { type: GraphQLFloat },
    currency: { type: GraphQLString },
    discount_percentage: { type: GraphQLFloat },
    is_available: { type: GraphQLBoolean },
    is_veg: { type: GraphQLBoolean },
    is_customizable: { type: GraphQLBoolean },
    spicy_level: { type: GraphQLString },
    preparation_time_minutes: { type: GraphQLInt },
    dietary_tags: { type: GraphQLJSONObject },
    ingredients: { type: GraphQLString },
    availability_start_time: { type: GraphQLTime },
    availability_end_time: { type: GraphQLTime },
    stock_quantity: { type: GraphQLInt },
    min_order_qty: { type: GraphQLInt },
    max_order_qty: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    approval_status: { type: GraphQLString },
    rejection_reason: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
    deleted_at: { type: GraphQLDate },
    created_by: { type: UserType },
    updated_by: { type: UserType },
    deleted_by: { type: UserType },
  }),
});

export const CreateDishInputType = new GraphQLObjectType({
  name: "CreateDishInput",
  fields: () => ({
    restaurant_id: { type: GraphQLInt },
    branch_id: { type: GraphQLInt },
    category_id: { type: GraphQLInt },
    subcategory_id: { type: GraphQLInt },
    ...commonDishFields,
    ingredients_options: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "IngredientOption",
          fields: {
            id: { type: GraphQLInt },
            dish_id: { type: GraphQLInt },
            name: { type: GraphQLString },
            image_url: { type: GraphQLString },
            has_options: { type: GraphQLBoolean },
            created_at: { type: GraphQLDate },
            updated_at: { type: GraphQLDate },
          },
        })
      ),
    },
  }),
});