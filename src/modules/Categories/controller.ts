
import { NextFunction, Request, Response } from "express";
import { Category } from "../../models";
import { formatResponse } from "../../utils";
import sequelize from "../../configs/mysql";

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Category.findAndCountAll({});
    return formatResponse(res, {
      message: "Categories fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Category.findByPk(id);
    return formatResponse(res, {
      message: "Category fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    await Category.update(req.body, {
      where: { id },
      returning: true,
      transaction,
    });
    const data = await Category.findByPk(id, { transaction });
    await transaction.commit();
    return formatResponse(res, {
      message: "Category updated successfully",
      data: data?.toJSON(),
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await Category.destroy({
      where: { id },
      individualHooks: true,
      // @ts-expect-error sequelize hooks issue
      deleted_by: req.user_id,
    });
    return formatResponse(res, {
      message: "Category deleted successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};


export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Category.create(req.body);
     return formatResponse(res, {
      message: "Category created successfully",
      data: data.toJSON(),
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};