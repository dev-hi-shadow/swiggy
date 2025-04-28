import sequelize from "../../configs/mysql";
import { Authenticate } from "../../middlewares/Authenticate";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { ThrowError } from "../../utils/ThrowError";
import { CreateOrUpdateRestaurant } from "./services";
import { RestaurantResponse, RestaurantType } from "./typeDefs";
import { IRestaurant } from "./types";

export const createRestaurant = {
  type: RestaurantResponse,
  args: getArguments<IRestaurant>({
    outputType: RestaurantType,
    exclude: [
      "id",
      "created_at",
      "updated_at",
      "deleted_at",
      "updated_by",
      "deleted_by",
      "status",
      "rejection_reason",
    ],
    nullables: ["all"],
  }),
  resolve: Authenticate(
    async (parent: any, args: any, context: Context) => {
      const { user } = context.req;
      const transaction = await sequelize.transaction();
      try {
        const data = await CreateOrUpdateRestaurant(
          {
            ...args,
            owner_id: user.id,
            created_by: user.id,
          },
          transaction
        );
        await transaction.commit();
        return formatResponse({
          message: "Restaurant created successfully",
          data,
        });
      } catch (error) {
        await transaction.rollback();
        throw new ThrowError(500, (error as Error)?.message);
      }
    },
    [{ resource: "restaurants", actions: ["write"] }]
  ),
};

export const updateRestaurant = {
  type: RestaurantResponse,
  args: getArguments<IRestaurant>({
    outputType: RestaurantType,
    nullables: [
      "description",
      "slug",
      "cuisine_types",
      "tags",
      "website_url",
      "gst_number",
      "fssai_license_number",
      "account_number",
      "ifsc_code",
    ],
  }),
  resolve: Authenticate(
    async (parent: any, args: any, context: Context) => {
      const { user } = context.req;
      const transaction = await sequelize.transaction();
      try {
        const data = await CreateOrUpdateRestaurant(
          {
            ...args,
            updated_by: user.id,
          },
          transaction,
          true
        );
        await transaction.commit();
        return formatResponse({
          message: "Restaurant updated successfully",
          data,
        });
      } catch (error) {
        await transaction.rollback();
        throw new ThrowError(500, (error as Error)?.message);
      }
    },
    [{ resource: "restaurants", actions: ["write"] }]
  ),
};
