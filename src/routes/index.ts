import { GraphQLObjectType } from "graphql";
import Role from "../modules/Roles";
import User from "../modules/Users";
import Restaurants from "../modules/Restaurants";
import RBranch from "../modules/RBranches";
import Category from "../modules/Categories";
import SubCategory from "../modules/Sub-categories";
 
import Dishes from "../modules/Dishes";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    ...Role.Query,
    ...User.Query,
    ...Restaurants.Query,
    ...RBranch.Query,
    ...Category.Query,
    ...SubCategory.Query,
    ...Dishes.Query,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    ...Role.Mutation,
    ...User.Mutation,
    ...Restaurants.Mutation,
    ...Category.Mutation,
    ...SubCategory.Mutation,
    ...RBranch.Mutation,
    ...Dishes.Mutation,
  }),
});

export { RootQuery, RootMutation };
