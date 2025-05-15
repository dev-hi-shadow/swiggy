import { IUser } from "../Users/types";
import { RBranch, Restaurants, User } from "../../models";
import { IRBranch } from "./types";
import { Op, Transaction } from "sequelize";
import { restaurant } from "../Restaurants/queries";

export const GetRBranches = async (user: IUser, restaurant_id: number) => {
  const include = [
    { model: User, as: "owner" },
    { model: User, as: "manager" },
    { model: Restaurants, as: "restaurant" },
  ];
  return await RBranch.findAll({
    where: { restaurant_id },
    include,
  });
};

export const GetBranchById = async (
  id: number,
  type: "branch" | "restaurant" = "branch"
) => {
  if (type === "branch") {
    return await RBranch.findByPk(id, {
      include: [
        {
          model: Restaurants,
          as: "restaurant",
          attributes: ["id", "name"],
        },
      ],
    });
  } else {
    return await RBranch.findAndCountAll({
      where: {
        restaurant_id: id,
      },
      include: [
        {
          model: Restaurants,
          as: "restaurant",
          attributes: ["id", "name"],
        },
      ],
    });
  }
};

export const CreateOrUpdaterBranch = async (
  payload: IRBranch,
  user: IUser,
  transaction: Transaction,
  isReturning?: boolean
) => {
  payload = { ...payload, created_by: user.id, updated_by: user?.id };
  if (payload?.id) {
    const data = await RBranch.update(payload, {
      where: {
        id: payload.id,
      },
    });
    if (isReturning) {
      return (await RBranch.findByPk(payload.id, { transaction }))?.toJSON();
    }
    return data;
  } else {
    return await RBranch.create(payload);
  }
};
export const DeleteBranch = async (id: number, user: IUser) => {
  return await RBranch.destroy({
    where: {
      id,
    },
    hooks: true,
    individualHooks: true,
    // @ts-ignore
    deleted_by: user.id,
  });
};




export const getRBranchCount = async ({
  user_id,
  restaurant_id,
}: {
  user_id?: number;
  restaurant_id?: number;
}) => {
  return await RBranch.count({
    distinct: true,
    where: {
      [Op.or]: [{ manager_id: user_id, restaurant_id }],
    },
  });
};