export interface IRole {
  id: number;
  name: string;
  description?: string | null;
  permissions: object | string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_admin: boolean;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}
