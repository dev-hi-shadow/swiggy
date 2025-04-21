import { GraphQLList } from "graphql";
import { formatResponse } from "../../utils";
import { formatResponseType } from "../../utils/typeDefs";
import { CategoryType } from "./typeDefs";

export const list = {
  type: formatResponseType("Categories", new GraphQLList(CategoryType)),
  
};