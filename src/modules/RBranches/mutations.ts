import { Authenticate } from "../../middlewares/Authenticate";
import { Context } from "../../types";
import { formatResponse, getArguments } from "../../utils";
import { formatResponseType } from "../../utils/typeDefs";
import { BranchType } from "./typeDefs";
import { IRBranch } from "./types";
import { CreateOrUpdaterBranch, DeleteBranch } from "./services";

export const createBranch = {
  type: formatResponseType("createBranch", BranchType),
  args: getArguments<IRBranch>({
    outputType: BranchType,
    exclude: ["id", "rating"],
    nullables: [
      "alternate_phone_number",
      "approval_notes",
      "approval_status",
      "average_price_for_two",
      "delivery_charge",
      "external_integration_id",
      "full_description",
      "id",
      "is_available_for_delivery",
      "is_available_for_pickup",
      "is_featured",
      "is_open",
      "timezone",
      "special_closing_time",
      "special_opening_time",
      "slug",
      "approval_status",
      "longitude",
      "latitude",
      "max_order_value",
      "min_order_value",
      "short_description",
    ],
  }),
  resolve: Authenticate(async (parents: any, args: any, context: Context) => {
    const { user } = context.req;
    const data = await CreateOrUpdaterBranch(args, user);
    return formatResponse({
      message: "Branch created successfully",
      data,
      status: 201,
    });
  }, []),
};

export const updateBranch = {
  type: formatResponseType("updateBranch", BranchType),
  args: getArguments<IRBranch>({
    outputType: BranchType,
    exclude: ["id", "rating"],
    nullables: Object.keys({
      all: "",
    } as unknown as IRBranch) as (keyof IRBranch)[],
  }),
  resolve: Authenticate(
    async (parents: any, args: any, context: Context) => {
      const { user } = context.req;
      const data = await CreateOrUpdaterBranch(args, user);
      return formatResponse({
        message: "Branch created successfully",
        data,
        status: 201,
      });
    },
    [{ resource: "restaurant", actions: ["read", "write"] }]
  ),
};
export const deleteBranch = {
  type: formatResponseType("deleteBranch", BranchType),
  args: getArguments<IRBranch>({
    outputType: BranchType,
    includes: ["id"],
  }),
  resolve: Authenticate(
    async (parents: any, args: any, context: Context) => {
      const { user } = context.req;
      const { id } = args;
      const data = await DeleteBranch(Number(id), user);
      return formatResponse({
        message: "Branch created successfully",
        data,
        status: 201,
      });
    },
    [{ resource: "restaurant", actions: ["read", "write"] }]
  ),
};
