import { Transaction } from "sequelize";
import { Restaurants } from "../../models";
import { ThrowError } from "../../utils/ThrowError";
export const getRestaurants = async (id?: number) => {
  if (id) {
    return await Restaurants.findByPk(id);
  } else {
    return await Restaurants.findAll();
  }
};

export const CreateOrUpdateRestaurant = async (
  payload: any,
  transaction: Transaction,
  isReturning: boolean = false
) => {
  if (payload.id) {
    const restaurant = await Restaurants.findByPk(payload.id);
    if (!restaurant) {
      throw new ThrowError(404, "Restaurant not found");
    }
    const data = await Restaurants.update(payload, {
      where: { id: payload.id },
      transaction,
    });
    if (isReturning) {
      return await Restaurants.findByPk(payload.id, { transaction });
    }
    return data;
  } else {
    return await Restaurants.create(payload, { transaction });
  }
};
