import { Transaction } from "sequelize";
import { Category } from "../../models";
import { ThrowError } from "../../utils/ThrowError";
import { IUser } from "../Users/types";
import { ICategory } from "./types";

export const GetCategories = async (id?: number) => {
  if (id) {
    return await Category.findByPk(id);
  }
  return await Category.findAndCountAll({});
};

export const CreateOrUpdateCategory = async (
  payload: ICategory,
  transaction: any
) => {
  try {
    if (payload?.id) {
      const data = await Category.update(payload, {
        where: {
          id: payload.id,
        },
        transaction,
        returning: true,
      });
      if (!data[0]) {
        throw new ThrowError(404, "Category not found");
      }
      return await Category.findByPk(payload.id);
    } else {
      return await Category.create(payload, { transaction });
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

export const DeleteCategory = async (
  id: number,
  user: IUser,
  transaction: Transaction
) => {
  const data = await Category.destroy({
    where: {
      id,
    },
    individualHooks: true,
    transaction,
    //@ts-ignore
    deleted_by: user.id,
  });
  if (!data) {
    throw new ThrowError(404, "Category not found");
  }
  return data;
};
