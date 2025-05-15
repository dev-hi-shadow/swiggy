import { Op, Transaction } from "sequelize";
import { RBranch, Restaurants } from "../../models";
import { ThrowError } from "../../utils/ThrowError";
import { IUser } from "../Users/types";
export const getRestaurants = async (id?: number, user?: Partial<IUser>) => {
  let where = {};

  if (!user?.role?.is_admin) {
    where = {
      [Op.or]: {
        owner_id: user?.id,
      },
      approval_status: {
        [Op.not]: "rejected",
      },
      rejection_reason: {
        [Op.eq]: null,
      },
    };
  }
  const include = [
    {
      model: RBranch,
      required: false,
      as: "branches",
      where: {
        ...(user?.role?.is_admin
          ? {}
          : {
              [Op.or]: {
                owner_id: user?.id,
                manager_id: user?.id,
              },
              approval_status: {
                [Op.not]: "rejected",
              },
            }),
      },
    },
  ];
  if (id) {
    return await Restaurants.findByPk(id, { include });
  } else {
    return await Restaurants.findAll({
      where,
      include,
    });
  }
};

export const CreateOrUpdateRestaurant = async (
  payload: any,
  transaction: Transaction,
  isReturning: boolean = false
) => {
  const include = [
    {
      model: RBranch,
      as: "branches",
    },
  ];
  if (payload.id) {
    const restaurant = await Restaurants.findByPk(payload.id, {
      include,
    });
    if (!restaurant) {
      throw new ThrowError(404, "Restaurant not found");
    }
    const data = await Restaurants.update(payload, {
      where: { id: payload.id },
      transaction,
    });
    if (isReturning) {
      return await Restaurants.findByPk(payload.id, { include, transaction });
    }
    return data;
  } else {
    return await Restaurants.create(payload, { transaction, include });
  }
};



export const getRestaurantCount = async (user_id: number) => {
  return await Restaurants.count({
    distinct: true,
    where: {
      [Op.or]: [{ owner_id: user_id }],
    },
  });
};