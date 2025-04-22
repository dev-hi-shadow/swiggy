import { createUser, deleteUser, login, register, updateUser } from "./mutations";
import { getProfile, usersList } from "./queries";

export default {
  Query: { usersList, getProfile },
  Mutation: { createUser, updateUser, deleteUser, login, register },
};