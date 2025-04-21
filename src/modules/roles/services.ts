import { Transaction } from "sequelize";
import { Role } from "../../models";
import { IRole } from "./types";

export const CreateOrUpdateRole = async (
  body: Partial<IRole>,
  transaction: Transaction | undefined
) => {
  const { id } = body;
  if (id) {
    await Role.update(body, {
      where: { id },
      transaction,
    });
    return Role.findByPk(id, { transaction });
  }

  return await Role.create(body as IRole, { transaction });
};

export const DeleteRole = async (
  id: number,
  transaction: Transaction | undefined
) => {
  return await Role.destroy({
    where: { id },
    transaction,
  });
};
