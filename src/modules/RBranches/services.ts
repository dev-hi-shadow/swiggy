import { IUser } from "../users/types";
import { RBranch, Restaurants } from "../../models";
import { Op } from "sequelize";
import { IRBranch } from "./types";

export const GetRBranches = async (user: IUser) => {
  const { role } = user;
  if (role?.is_admin) {
    return await RBranch.findAll({});
  } else {
    return await RBranch.findAll({});
  }
};

export const GetBranchById = async (
  id: number,
  type?: "branch" | "restaurant"
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

export const CreateOrUpdaterBranch = async (payload: IRBranch, user: IUser) => {
  payload = { ...payload, created_by: user.id, updated_by: user?.id };
  if (payload?.id) {
    return await RBranch.update(payload, {
      where: {
        id: payload.id,
      },
    });
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
