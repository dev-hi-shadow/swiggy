import { IDIngredient } from "../DIngredients/types";
import { IDCustomization } from "../IDCustomizations/types";

export interface IDish {
  id: number;
  restaurant_id: number;
  branch_id?: number;
  category_id?: number;
  subcategory_id?: number;
  parent_dish_id?: number;
  name: string;
  slug?: string;
  description?: string;
  long_description?: string;
  image?: string;
  banner_image?: string;
  gallery_images?: string[];
  video_url?: string;
  tags?: string[];
  price: number;
  original_price?: number;
  currency: string;
  price_unit?: "per_item" | "per_kg" | "per_litre" | "per_person";
  tax_percentage?: number;
  tax_inclusive?: boolean;
  service_charge_percentage?: number;
  packaging_charge?: number;
  discount_type: "fixed" | "percentage";
  discount_amount?: number;
  discount_percentage?: number;
  discount_start_time?: string;
  discount_end_time?: string;
  discount_max_quantity?: number;
  discount_min_quantity?: number;
  discount_max_quantity_per_user?: number;
  discount_min_quantity_per_user?: number;
  discount_max_quantity_per_order?: number;
  discount_min_quantity_per_order?: number;
  discount_max_quantity_per_user_per_order?: number;
  discount_min_quantity_per_user_per_order?: number;
  discount_applies_with_coupon?: boolean;
  promo_code_applicable?: boolean;
  is_available: boolean;
  availability_days?: string[];
  availability_start_time?: string;
  availability_end_time?: string;
  blackout_dates?: string[];
  preorder_available?: boolean;
  preorder_hours?: number;
  delivery_eta_minutes?: number;
  delivery_buffer_minutes?: number;
  preparation_time_minutes?: number;
  stock_quantity?: number;
  min_order_qty?: number;
  max_order_qty?: number;
  available_portions?: number;
  is_veg: boolean;
  is_customizable: boolean;
  spicy_level?: "mild" | "medium" | "hot";
  dietary_tags?: string[];
  allergen_info?: string[];
  allergens?: string[];
  ingredients?: string;
  ingredients_options?: IDIngredient[];
  customization_groups?: IDCustomization[];
  addons_group_ids?: number[];
  variant_group_ids?: number[];
  combo_group_id?: number;
  is_part_of_combo?: boolean;
  meal_time_tags?: ("breakfast" | "lunch" | "dinner" | "snack")[];
  featured: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_popular: boolean;
  is_recommended: boolean;
  is_best_seller: boolean;
  is_chef_special: boolean;
  is_available_for_delivery: boolean;
  is_available_for_pickup: boolean;
  is_available_for_dine_in: boolean;
  is_available_for_takeaway: boolean;
  language_tags?: string[];
  regional_exclusivity?: string[];
  cuisine_type?: string[];
  name_translations?: Record<string, string>;
  description_translations?: Record<string, string>;
  seo_title?: string;
  seo_description?: string;
  promo_tags?: string[];
  share_url?: string;
  rating?: number;
  total_reviews?: number;
  average_rating?: number;
  total_orders?: number;
  reorder_rate?: number;
  cart_additions?: number;
  view_count?: number;
  conversion_rate?: number;
  user_likes_count?: number;
  order_count?: number;
  reorder_probability?: number;
  smart_tags?: string[];
  kitchen_station?: string;
  priority_order?: number;
  shelf_life_hours?: number;
  is_ready_to_eat?: boolean;
  approval_status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  fssai_info?: {
    license_number: string;
    label_required: boolean;
  };
  auto_tags?: string[];
  paired_dish_ids?: number[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export const nullable: (keyof IDish)[] = [
  "id",
  "restaurant_id",
  "branch_id",
  "category_id",
  "subcategory_id",
  "name",
  "slug",
  "description",
  "image",
  "banner_image",
  "price",
  "original_price",
  "currency",
  "discount_percentage",
  "is_available",
  "is_veg",
  "is_customizable",
  "spicy_level",
  "preparation_time_minutes",
  "dietary_tags",
  "ingredients",
  "availability_start_time",
  "availability_end_time",
  "stock_quantity",
  "min_order_qty",
  "max_order_qty",
  "rating",
  "approval_status",
  "rejection_reason",
  "created_at",
  "updated_at",
  "deleted_at",
  "parent_dish_id",
  "long_description",
  "gallery_images",
  "video_url",
  "tags",
  "price_unit",
  "tax_percentage",
  "tax_inclusive",
  "service_charge_percentage",
  "packaging_charge",
  "discount_type",
  "discount_amount",
  "discount_start_time",
  "discount_end_time",
  "discount_max_quantity",
  "discount_min_quantity",
  "discount_max_quantity_per_user",
  "discount_min_quantity_per_user",
  "discount_max_quantity_per_order",
  "discount_min_quantity_per_order",
  "discount_applies_with_coupon",
  "promo_code_applicable",
  "availability_days",
  "blackout_dates",
  "preorder_available",
  "preorder_hours",
  "delivery_eta_minutes",
  "delivery_buffer_minutes",
  "available_portions",
  "ingredients_options",
  "customization_groups",
  "allergen_info",
  "allergens",
  "addons_group_ids",
  "variant_group_ids",
  "combo_group_id",
  "is_part_of_combo",
  "meal_time_tags",
  "featured",
  "is_featured",
  "is_new",
  "is_popular",
  "is_recommended",
  "is_best_seller",
  "is_chef_special",
  "is_available_for_delivery",
  "is_available_for_pickup",
  "is_available_for_dine_in",
  "is_available_for_takeaway",
  "language_tags",
  "regional_exclusivity",
  "cuisine_type",
  "name_translations",
  "description_translations",
  "seo_title",
  "seo_description",
  "promo_tags",
  "share_url",
  "total_reviews",
  "average_rating",
  "total_orders",
  "reorder_rate",
  "cart_additions",
  "view_count",
  "conversion_rate",
  "user_likes_count",
  "order_count",
  "reorder_probability",
  "smart_tags",
  "kitchen_station",
  "priority_order",
  "shelf_life_hours",
  "is_ready_to_eat",
  "fssai_info",
  "auto_tags",
  "paired_dish_ids",
  "ingredients_options",
  "customization_groups",
];
