import { IDeal } from "../deals/types";
 import { IRestaurant } from "../restaurants/types";

export interface IRDeals {
  id: number;
  deal_id: number;
  restaurant_id: number;
  created_at: Date;
  updated_at: Date;
  deal?: IDeal;
  restaurant?: IRestaurant;
}

