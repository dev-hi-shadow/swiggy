import { Transaction } from "sequelize";
import { IRDeals } from "./types";
import { Deals, RDeals, Restaurants } from "../../models";
import { ThrowError } from "../../utils/ThrowError";

export const CreateRDeal = async (
  payload: IRDeals,
  transaction: Transaction
) => {
  return await RDeals.create(payload, {
    transaction,
    returning: true,
    include: [
      {
        model: Restaurants,
        as: "restaurant",
        attributes: ["id", "name"],
      },
      {
        model: Deals,
        as: "deal",
        attributes: ["id", "title"],
      },
    ],
  });
};
export const DeleteRDeal = async (id: number, transaction: Transaction) => {
  const data = await RDeals.destroy({
    where: { id },
    transaction,
  });

  if (!data) throw new ThrowError(404, "Deal not found");
};

export const GetRDeal = async (id: number): Promise<IRDeals | null> => {
  return await RDeals.findByPk(id, {
    include: [
      {
        model: Restaurants,
        attributes: ["id", "name"],
      },
      {
        model: Deals,
        attributes: ["id", "name"],
      },
    ],
  });
};