import { NextFunction, Request, Response } from "express";
import { Restaurants } from "../../models";
import { formatResponse } from "../../utils";

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Restaurants.findAndCountAll({});
    return formatResponse(res, {
      message: "Restaurants fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Restaurants.findByPk(id);
    return formatResponse(res, {
      message: "Restaurant fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Restaurants.update(req.body, {
      where: { id },
      returning: true,
    });
    return formatResponse(res, {
      message: "Restaurant updated successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Restaurants.destroy({
      where: { id },
      individualHooks: true,
      // @ts-expect-error sequelize hooks issue
      deleted_by: req.user_id,
    });
    return formatResponse(res, {
      message: "Restaurant deleted successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};


export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Restaurants.create(req.body);
    return formatResponse(res, {
      message: "Restaurant created successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};