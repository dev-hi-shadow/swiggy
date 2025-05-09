import { Transaction } from "sequelize";
import { Dish } from "../../models";
import { IUser } from "../Users/types";

export const CreateOrUpdateDish = async (
  payload: any,
  transaction?: Transaction,
  isReturn = true
) => {
  if (payload?.id) {
    const UpdatedDish = await Dish.update(payload, {
      where: {
        id: payload?.id,
      },
      returning: true,
    });
    if (!UpdatedDish[0]) throw new Error("Dish not found");
    if (isReturn) return (await Dish.findByPk(payload?.id))?.toJSON();
    return UpdatedDish;
  } else {
    return await Dish.create(payload, {
      transaction,
    });
  }
};

export const getDishes = async (id?: number, user?: IUser) => {
  let data;

  if (id) {
    data = await Dish.findByPk(id, {});
  } else {
    data = await Dish.findAndCountAll({
      where: {},
    });
  }
  return data;
};
