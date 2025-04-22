import { ISubcategory } from "./types";
import { SubCategory } from "../../models";
import { Transaction } from "sequelize";
import { ThrowError } from "../../utils/ThrowError";
import { IUser } from "../Users/types";

export const GetSubCategories = async (payload: ISubcategory) => {
  if (payload?.id) {
    return await SubCategory.findByPk(payload.id);
  } else {
    return await SubCategory.findAndCountAll({
      where: {
        category_id: payload?.category_id,
      },
    });
  }
};

export const CreateOrUpdateSubcategory = async (
  payload: ISubcategory,
  transaction: Transaction
) => {
  if (payload?.id) {
    const data = await SubCategory.update(payload, {
      where: {
        id: payload.id,
      },
      transaction,
      returning: true,
    });
    if (!data[0]) {
      throw new ThrowError(404, "Subcategory not found");
    }
    return await SubCategory.findByPk(payload.id);
  } else {
    return await SubCategory.create(payload, { transaction });
  }
};


export const DeleteSubcategory = async (
  id: number,
  user: IUser,
  transaction: Transaction
) => {
  const data = await SubCategory.destroy({
    where: {
      id,
    },
    individualHooks: true,
    transaction,
    //@ts-ignore
    deleted_by: user?.id,
  });
  if (!data) {
    throw new ThrowError(404, "Subcategory not found");
  }
};