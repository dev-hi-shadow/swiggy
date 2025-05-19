import { IDCOption } from "../DCOptions/types";

export interface IDCustomization {
  id: number;
  dish_id: number;
  title: string;
  is_required: boolean;
  min_selection: number;
  max_selection: number;
  selection_type: "single" | "multiple";
  order: number;

  // Optional: Include associated options if needed
  options?: IDCOption[];
}
