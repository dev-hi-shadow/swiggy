import { Transaction } from "sequelize";
import { IRBDeals } from "./types";
import { RBDeals, Deals, RBranch, Restaurants } from "../../models";
import { ThrowError } from "../../utils/ThrowError";

export const CreateRBDeal = async (payload: IRBDeals, transaction: Transaction) => {
  return await RBDeals.create(payload, { transaction });
};
export const DeleteRBDeal = async (id: number, transaction: Transaction) => {
  const data = await RBDeals.destroy({
    where: { id },
    transaction,
  });

  if (!data) throw new ThrowError(404, "Deal not found");
};

export const GetRBDeal = async (id: number) => {
  return await RBDeals.findByPk(id, {
    include: [
      {
        model: RBranch,
        include: [
          {
            model: Restaurants,
            as: "restaurant",
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id", "location"],
      },
      {
        model: Deals,
        attributes: ["id", "name"],
      },
    ],
  });
};
