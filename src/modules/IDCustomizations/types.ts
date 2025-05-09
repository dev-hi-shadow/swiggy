import { IDCOption } from "../IDCOptions/types";

export interface IDCustomization {
  id: number;
  dish_id: number;
  title: string;
  is_required: boolean;
  min_selection: number;
  max_selection: number;
  selection_type: "single" | "multiple";
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  // Optional: Include associated options if needed
  options?: IDCOption[];
}
