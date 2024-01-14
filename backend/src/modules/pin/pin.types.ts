export interface PinData {
  id: string;
  user_id: string;
  description: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePinInput {
  user_id: number;
  description: string;
  image_url: string;
  created_at: Date;
}

export interface UpdatePinInput {
  user_id: string;
  description: string;
  image_url: string;
  updated_at: Date;
}
