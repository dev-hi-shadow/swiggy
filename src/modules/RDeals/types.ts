import { IDeal } from "../Deals/types";
 import { IRestaurant } from "../Restaurants/types";

export interface IRDeals {
  id: number;
  deal_id: number;
  restaurant_id: number;
  created_at: Date;
  updated_at: Date;
  deal?: IDeal;
  restaurant?: IRestaurant;
}

