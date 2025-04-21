export interface ICategory {
  id: number;
  name: string;
  slug?: string;
  short_description?: string;
  long_description?: string;
  image?: string;
  banner_image?: string;
  icon?: string;
  display_order?: number;
  is_featured: boolean;
  is_active: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}
