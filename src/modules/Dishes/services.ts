import { Op, Transaction } from "sequelize";
import { Dish, Category, DCustomization, DCOption } from "../../models";
import { IUser } from "../Users/types";
import { IPagination } from "../../types";
import { IDish } from "./types";

export const CreateOrUpdateDish = async (
  payload: any,
  transaction?: Transaction,
  isReturn = true
) => {
  try{

  
  if (payload?.id) {
    const UpdatedDish = await Dish.update(payload, {
      where: {
        id: payload?.id,
      },
      returning: true,
    });
    if (!UpdatedDish[0]) throw new Error("Dish not found");
    if (isReturn) return (await Dish.findByPk(payload?.id))?.toJSON();
    return UpdatedDish;
  } else {
    return await Dish.create(payload, {
      transaction,
    });
  } } catch(error){
    console.log("🚀 ~ error:", error);
  }
};

export const getDishes = async (id?: number, user?: IUser) => {
  let data;
  const include = [
    {
      model: DCustomization,
      as: "customization_groups",
      required: false,
      include: [
        {
          model: DCOption,
          as: "options",
        },
      ],
    },
  ];
  if (id) {
    data = await Dish.findByPk(id, {
      include,
    });
  } else {
    data = await Dish.findAndCountAll({
      where: {},
      include
    });
  }
   return data;
};

export const GetDishesByCategory = async (payload: IPagination<IDish>) => {
  const result = await Category.findAndCountAll({
    include: [
      {
        model: Dish,
        order: [["id", "ASC"]],
        limit: payload?.pageSize,
        as: "dishes",
        where: {
          ...(payload?.last_id ? { id: { [Op.gt]: payload?.last_id } } : {}),
          ...(payload?.category_id
            ? { category_id: payload?.category_id }
            : {}),
        },
        separate: true,
      },
    ],
  });
   return result;
};
