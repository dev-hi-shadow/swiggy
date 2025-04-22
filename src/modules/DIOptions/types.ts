export interface IDIOption {
  id: number;
  name: string;
  price: number;
  ingredient_id: number;
  description?: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}
