import { Transaction } from "sequelize";
import { ICDeals } from "./types";
import { Category, CDeals, Deals } from "../../models";
import { ThrowError } from "../../utils/ThrowError";

export const CreateCDeal = async (
  payload: ICDeals,
  transaction: Transaction
) => {
  return await CDeals.create(payload, { transaction });
};
export const DeleteCDeal = async (id: number, transaction: Transaction) => {
  const data = await CDeals.destroy({
    where: { id },
    transaction,
  });

  if (!data) throw new ThrowError(404, "Deal not found");
};


export const GetCDeal = async (id: number) => {
  return await CDeals.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
      },
      {
        model: Deals,
        attributes: ["id", "name"],
      },
    ],
  });
};