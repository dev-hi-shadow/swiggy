import { NextFunction, Request, Response } from "express";
import { Dish } from "../../models";
import { formatResponse } from "../../utils";

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Dish.findAndCountAll({});
    return formatResponse(res, {
      message: "Dishes fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getDishById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Dish.findByPk(id);
    return formatResponse(res, {
      message: "Dish fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Dish.update(req.body, {
      where: { id },
      returning: true,
    });
    return formatResponse(res, {
      message: "Dish updated successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Dish.destroy({
      where: { id },
      individualHooks: true,
      // @ts-expect-error sequelize hooks issue
      deleted_by: req.user_id,
    });
    return formatResponse(res, {
      message: "Dish deleted successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};


export const createDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Dish.create(req.body);
    return formatResponse(res, {
      message: "Dish created successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};