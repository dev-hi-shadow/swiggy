import { NextFunction, Request, Response } from "express";
import { SubCategory } from "../../models";
import { formatResponse } from "../../utils";
import sequelize from "../../configs/mysql";

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {category_id} = req.params
    const data = await SubCategory.findAndCountAll({
      where: {
        ...(category_id ? { category_id } : {}),
      },
    });
    return formatResponse(res, {
      message: "SubCategories fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await SubCategory.findByPk(id);
    return formatResponse(res, {
      message: "SubCategory fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
     await SubCategory.update(req.body, {
       where: { id },
       returning: true,
       transaction,
     });
    const data = await SubCategory.findByPk(id, { transaction });
    await transaction.commit();
     return formatResponse(res, {
       message: "SubCategory updated successfully",
       data: data?.toJSON(),
       isToast: false,
     });
  } catch (error) {
    next(error);
  }
};

export const deleteSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await SubCategory.destroy({
      where: { id },
      individualHooks: true,
      // @ts-expect-error sequelize hooks issue
      deleted_by: req.user_id,
    });
    return formatResponse(res, {
      message: "SubCategory deleted successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};


export const createSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await SubCategory.create(req.body);
    return formatResponse(res, {
      message: "SubCategory created successfully",
      data: data?.toJSON(),
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};