export interface IDCOption {
  id: number;
  customization_id: number;
  title: string;
  price: number;
  is_default: boolean;
  is_available: boolean;
  calories?: number | null;
  order: number;
 
}
