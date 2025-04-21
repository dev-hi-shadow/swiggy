import { GraphQLObjectType } from "graphql";
import Role from "../modules/roles";
import User from "../modules/users";
import Restaurants from "../modules/restaurants";
import RBranch from "../modules/RBranches";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    ...Role.Query,
    ...User.Query,
    ...Restaurants.Query,
    ...RBranch.Query,
    
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    ...Role.Mutation,
    ...User.Mutation,
    ...Restaurants.Mutation,
    ...RBranch.Mutation,

  }),
});

export { RootQuery, RootMutation };
