import { ICategory } from "../Categories/types";
import { IDeal } from "../Deals/types";

export interface ICDeals {
  id: number;
  deal_id: number;
  category_id: number;
  created_at: Date;
  updated_at: Date;
  deal?: IDeal;
  category?: ICategory;
}
