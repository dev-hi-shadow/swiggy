
import { NextFunction, Request, Response } from "express";
import { RBranch } from "../../models";
import { formatResponse } from "../../utils";

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await RBranch.findAndCountAll({});
    return formatResponse(res, {
      message: "RBranch fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getBranchById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await RBranch.findByPk(id);
    return formatResponse(res, {
      message: "Branch fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBranch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await RBranch.update(req.body, {
      where: { id },
      returning: true,
    });
    return formatResponse(res, {
      message: "Branch updated successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBranch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await RBranch.destroy({
      where: { id },
      individualHooks: true,
      // @ts-expect-error sequelize hooks issue
      deleted_by: req.user_id,
    });
    return formatResponse(res, {
      message: "Branch deleted successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};


export const createBranch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await RBranch.create(req.body);
    return formatResponse(res, {
      message: "Branch created successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};