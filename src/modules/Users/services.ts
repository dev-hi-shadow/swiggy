import { Transaction } from "sequelize";
import { Role, User } from "../../models";
import { IUser } from "./types";

export const getUsers = async (id?: number) => {
  const include = [
    {
      model: Role,
      as: "role",
      attributes: ["id", "name", "permissions"],
    },
  ];
  if (id) {
    return await User.findByPk(id, { include });
  }
  return await User.findAndCountAll({ include });
};

export const getUserByQuery = async (query: any) => {
  return await User.findOne({ where: query });
};

export const createOrUpdateUser = async (
  payload: any,
  transaction?: Transaction
) => {
  if (payload.id) {
    return await User.update(payload, {
      where: { id: payload.id },
      transaction,
    });
  } else {
    return await User.create(payload, { transaction });
  }
};

export const deleteUserById = async (
  payload: { id: number; deleted_by: number },
  transaction?: Transaction
) => {
  return await User.destroy({
    where: { id: payload.id },
    individualHooks: true,
    transaction,
    hooks: true,
    // @ts-ignore - we're adding a custom option not in Sequelize's typing
    deleted_by: payload.deleted_by,
  });
};
