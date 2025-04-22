import { GraphQLObjectType } from "graphql";
import Role from "../modules/roles";
import User from "../modules/users";
import Restaurants from "../modules/restaurants";
import RBranch from "../modules/RBranches";
import Category from "../modules/categories";
import SubCategory from "../modules/sub-categories";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    ...Role.Query,
    ...User.Query,
    ...Restaurants.Query,
    ...RBranch.Query,
    ...Category.Query,
    ...SubCategory.Query,
    
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
  }),
});

export { RootQuery, RootMutation };
