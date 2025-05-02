import { roleList, getRoleById } from "./queries";
import { createRole, updateRole, deleteRole } from "./mutations";
export default {
  Query: { roleList, getRoleById },
  Mutation: {
    createRole,
    updateRole,
    deleteRole,
  },
};
