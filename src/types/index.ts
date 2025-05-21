import { Optional } from "sequelize";
import { IUser } from "../modules/Users/types";
import { Request } from "express";
import { IRole } from "../modules/Roles/types";
import type * as Multer from "multer";

declare module "sequelize" {
  interface InstanceDestroyOptions {
    deleted_by?: number;
  }
}


export interface IPagination<T> {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  filter?: Record<keyof T | string, unknown>;
  sortBy?: keyof T | string;
  sortOrder?: "asc" | "desc";
  last_id?: number;
  [key: string]: unknown;
}

export interface ResponseOptions<T = any> {
  message?: string;
  data?: T;
  statusCode?: number;
  isError?: boolean;
  isToast?: boolean;
}


declare global {
  namespace Express {
    interface Request {
      user: Partial<IUser>;
      file?: Express.Multer.File;
      files?:
        | Express.Multer.File[]
        | { [fieldname: string]: Express.Multer.File[] };
    }
  }
}

export type CreationAttrs<T> = Optional<
  T,
  Extract<
    keyof T,
    | "id"
    | "created_at"
    | "updated_at"
    | "deleted_at"
    | "created_by"
    | "updated_by"
    | "deleted_by"
  >
>;

export interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: "mysql" | "postgres" | "sqlite";
}

export interface Context {
  req: Request & {
    user?: IUser & { role: IRole };
  };
}
