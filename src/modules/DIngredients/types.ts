import { IDIOption } from "../DIOptions/types";

export interface IDIngredient {
  id: number;
  dish_id: number;
  name: string;
  image_url?: string;
  has_options: boolean;
  created_at: Date;
  updated_at: Date;
  options?: IDIOption[];
}
