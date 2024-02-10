export interface PinData {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
}

export interface CreatePinInput {
  user_id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  created_at: Date;
  created_by: string;
}

export interface UpdatePinInput {
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  updated_at: Date;
  created_by: string;
}
