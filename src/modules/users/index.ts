import { createUser, deleteUser, login, register, updateUser } from "./mutations";
import { getProfile, list } from "./queries";

export default {
  Query: { list, getProfile },
  Mutation: { createUser, updateUser, deleteUser, login , register },
};