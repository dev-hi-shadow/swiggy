import { NextFunction, Request, Response } from "express";
import { Role, User } from "../../models";
import { formatResponse, generateToken } from "../../utils";
import bcrypt from "bcrypt";
import { IUser } from "./types";
import sequelize from "../../configs/mysql";

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await User.findAndCountAll({});
    return formatResponse(res, {
      message: "Users fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);
    return formatResponse(res, {
      message: "User fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
     await User.update(req.body, {
      where: { id },
      returning: true,
      transaction
    });
    const data = (
      await User.findByPk(id, {
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["permissions", "name", "id"],
          },
        ],
      })
    )?.toJSON();
    await transaction.commit();
    return formatResponse(res, {
      message: "User updated successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await User.destroy({
      where: { id },
      individualHooks: true,
      // @ts-expect-error  sequelize hooks issue
      deleted_by: req.user_id,
    });
    return formatResponse(res, {
      message: "User deleted successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await User.create(req.body, {
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["permissions", "name", "id"],
        },
      ],
    });
    return formatResponse(res, {
      message: "User created successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const payload = { ...req.body, password: hashPassword };
    const data = await User.create(payload);
    const userData = data.toJSON() as IUser;
    const token = generateToken({id : data.id});
    return formatResponse(res, {
      message: "User created successfully",
      data: { ...userData, token },
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    let data = await User.findOne({ where: { email } });
    if (!data) {
      return res.status(404).json({
        message: "User not found",
        isToast: false,
      });
    }
    const isPasswordValid = await data.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
        isToast: false,
      });
    }
    const token = generateToken({id : data.id});
    const userData =  (data.toJSON() as IUser) ?? {};
    return formatResponse(res, {
      message: "User logged in successfully",
      data: { ...userData, token },
    });
  } catch (error) {
    next(error);
  }
};

export const profile  = async (req :Request , res : Response , next : NextFunction)=>{
  try {
     const data = req.user;
    return formatResponse(res, {
      message: "User profile fetched successfully",
      data,
      isToast: false,
    });
  } catch (error) {
    next(error);
  }
}