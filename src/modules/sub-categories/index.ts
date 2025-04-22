import {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "./mutations";
  import { getSubcategoryById, subCategoriesList } from "./queries";
export default {
  Query: { subCategoriesList, getSubcategoryById },
  Mutation: {
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  },
};