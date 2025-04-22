import { createCategory, deleteCategory, updateCategory } from "./mutations";
import { getCategoryById, categoryList } from "./queries";
 
export default {
  Query: { getCategoryById, categoryList },
  Mutation: {
    createCategory,
    updateCategory,
    deleteCategory,
  },
};