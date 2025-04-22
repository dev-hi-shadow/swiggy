export interface IDeal {
  id: number;
  title: string;
  description?: string;
  banner_image?: string;
  discount_type: "percentage" | "flat";
  discount_value: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}
