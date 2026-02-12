
export interface MenuItem {
  id: string;
  name_it: string;
  name_en: string;
  desc_it: string;
  desc_en: string;
  price: number;
  category: 'food' | 'drink';
  is_available: boolean;
  image_url: string;
  created_at?: string;
}

export interface ServiceRequest {
  id: string;
  table_number: number;
  status: 'pending' | 'completed';
  created_at: string;
}

export interface AppSetting {
  id: string;
  setting_key: string;
  setting_value: boolean;
}

export type Language = 'it' | 'en';
