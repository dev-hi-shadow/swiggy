import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Role, User } from "../models";

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
     const authToken = token.split(" ")[1];
     const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string);
     if (!decoded) {
       return res.status(401).json({ message: "Unauthorized" });
     }
    const { id } = decoded as { id: string };
    const user = await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name", "permissions"],
        },
      ],
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user.toJSON();
    next();

  } catch (error) {
    next(error);
  }
};
