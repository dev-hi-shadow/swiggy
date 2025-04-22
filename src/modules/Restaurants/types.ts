import { IRBranch } from "../RBranches/";

export interface IRestaurant {
  id: number;
  owner_id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  email: string;
  cuisine_types?: string[];
  tags?: string[];
  website?: string;
  gst_number?: string;
  fssai_license_number?: string;
  bank_account_number?: string;
  bank_ifsc_code?: string;
  status?: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
  branches?: IRBranch[];
}
