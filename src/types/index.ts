import { Optional } from "sequelize";
import { IUser } from "../modules/users/types";
import { Request } from "express";
import { IRole } from "../modules/roles/types";

declare module "sequelize" {
  interface InstanceDestroyOptions {
    deleted_by?: number;
  }
}

export interface ResponseOptions<T = any> {
  message?: string;
  data?: T;
  statusCode?: number;
  isError?: boolean;
  isToast?: boolean;
}

declare module "express" {
  interface Request {
    user: Partial<IUser>;
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
