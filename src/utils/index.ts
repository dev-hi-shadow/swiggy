import { Response } from "express";
import jwt from "jsonwebtoken";
export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

export const formatResponse = (
  res: Response,
  ResponseData: {
    message: string;
    data: any;
    statusCode?: number;
    isError?: boolean;
    isToast?: boolean;
    isNextPage?: boolean;
    limit?: number;
    page?: number;
    totalCount?: number;
  }
) => {
  const {
    data,
    message,
    isError,
    isNextPage,
    isToast,
    limit,
    page,
    totalCount,
    statusCode,
  } = ResponseData;
  return res.status(statusCode || 200).json({
    ...(message ? { message } : {}),
    data: {
      ...(data ? { data } : {}),
      ...(isNextPage ? { isNextPage } : {}),
      ...(limit ? { limit } : {}),
      ...(page ? { page } : {}),
      ...(totalCount ? { totalCount } : {}),
    },
    ...(isError ? { isError } : {}),
    ...(isToast ? { isToast } : {}),
  });
};
