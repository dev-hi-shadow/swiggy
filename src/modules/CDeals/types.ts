import { ICategory } from "../categories/types";
import { IDeal } from "../deals/types";

export interface ICDeals {
  id: number;
  deal_id: number;
  category_id: number;
  created_at: Date;
  updated_at: Date;
  deal?: IDeal;
  category?: ICategory;
}
