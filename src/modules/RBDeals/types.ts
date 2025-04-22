import { IDeal } from "../Deals/types";
import { IRBranch } from "../RBranches/types";

export interface IRBDeals {
  id: number;
  deal_id: number;
  rbranch_id: number;
  created_at: Date;
  updated_at: Date;
  deal?: IDeal;
  r_branch?: IRBranch;
}
