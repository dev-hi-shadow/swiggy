import { IDIngredient } from "../DIngredients/types";
import { IDCustomization } from "../IDCustomizations/types";

export interface IDish {
  // Core identifiers
  id: number;
  restaurant_id: number;
  branch_id?: number;
  category_id?: number;
  subcategory_id?: number;
  parent_dish_id?: number; // For variants

  // Basic details
  name: string;
  slug?: string;
  description?: string;
  long_description?: string;
  image?: string;
  banner_image?: string;
  gallery_images?: string[];
  video_url?: string;
  tags?: string[];

  // Pricing
  price: number;
  original_price?: number;
  currency: string;
  price_unit?: "per_item" | "per_kg" | "per_litre" | "per_person";
  tax_percentage?: number;
  tax_inclusive?: boolean;
  service_charge_percentage?: number;
  packaging_charge?: number;

  // Discounts
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

  // Availability & timing
  is_available: boolean;
  availability_days?: string[]; // ['monday', 'tuesday', ...]
  availability_start_time?: string;
  availability_end_time?: string;
  blackout_dates?: string[]; // ['2025-01-01', '2025-05-01']
  preorder_available?: boolean;
  preorder_hours?: number;
  delivery_eta_minutes?: number;
  delivery_buffer_minutes?: number;
  preparation_time_minutes?: number;

  // Quantity & inventory
  stock_quantity?: number;
  min_order_qty?: number;
  max_order_qty?: number;
  available_portions?: number;

  // Dietary & customizations
  is_veg: boolean;
  is_customizable: boolean;
  spicy_level?: "mild" | "medium" | "hot";
  dietary_tags?: string[]; // ['vegan', 'gluten-free', etc.]
  allergen_info?: string[];
  allergens?: string[];
  ingredients?: string;
  ingredients_options?: IDIngredient[];
  customization_groups?: IDCustomization[];

  // Add-ons & variants
  addons_group_ids?: number[];
  variant_group_ids?: number[];
  combo_group_id?: number;
  is_part_of_combo?: boolean;
  meal_time_tags?: ("breakfast" | "lunch" | "dinner" | "snack")[];

  // Attributes / visibility
  featured: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_popular: boolean;
  is_recommended: boolean;
  is_best_seller: boolean;
  is_chef_special: boolean;

  // Ordering channels
  is_available_for_delivery: boolean;
  is_available_for_pickup: boolean;
  is_available_for_dine_in: boolean;
  is_available_for_takeaway: boolean;

  // Regional / localization
  language_tags?: string[]; // ["en", "hi", "ta"]
  regional_exclusivity?: string[]; // city codes, pincode etc.
  cuisine_type?: string[];
  name_translations?: Record<string, string>;
  description_translations?: Record<string, string>;

  // SEO & marketing
  seo_title?: string;
  seo_description?: string;
  promo_tags?: string[];
  share_url?: string;

  // Ratings & analytics
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

  // Kitchen / operations
  kitchen_station?: string;
  priority_order?: number;
  shelf_life_hours?: number;
  is_ready_to_eat?: boolean;

  // Compliance
  approval_status: "pending" | "approved" | "rejected";
  rejection_reason?: string;

  fssai_info?: {
    license_number: string;
    label_required: boolean;
  };

  // AI / ML
  auto_tags?: string[];
  paired_dish_ids?: number[];

  // Audit
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}
