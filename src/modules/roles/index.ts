import {getAllRoles , getRoleById} from "./queries";
 import { createOrUpdateRole, deleteRole } from "./mutations";
export default {
  Query: { getAllRoles, getRoleById },
  Mutation: {
    createOrUpdateRole,
    deleteRole,
  },
};
