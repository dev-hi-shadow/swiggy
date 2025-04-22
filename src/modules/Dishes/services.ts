import { Transaction } from "sequelize";
import { Dish } from "../../models";

export const CreateOrUpdateDish = async (
  payload: any,
  transaction?: Transaction
) => {
  if (payload?.id) {
    const UpdatedDish = await Dish.update(payload, {
      where: {
        id: payload?.id,
      },
      returning: true,
    });
    if (!UpdatedDish[0]) throw new Error("Dish not found");
    return UpdatedDish[1][0];
  } else {
    return await Dish.create(payload, {
      transaction,
    });
  }
};
