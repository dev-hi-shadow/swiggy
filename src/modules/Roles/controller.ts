import { NextFunction, Request, Response } from "express";
import { Role } from "../../models";
import { formatResponse } from "../../utils";

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Role.findAndCountAll({
      attributes: ["id", "name", "permissions"],
    });
    return formatResponse(res, {
      message: "Roles fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};
export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Role.findByPk(id);
    return formatResponse(res, {
      message: "Role fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Role.update(req.body, {
      where: { id },
    });
    return formatResponse(res, {
      message: "Role updated successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Role.destroy({
      where: { id },
      individualHooks: true,
      // @ts-expect-error  sequelize hooks issue
      deleted_by: req.user_id,
    });
    return formatResponse(res, {
      message: "Role deleted successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};
