export interface UserPinData {
  user_id: number;
  description: string;
  image_url: string;
  created_at: Date;
}

export interface UpdateUserPinData {
  user_id: number;
  description: string;
  image_url: string;
  updated_at: Date;
}
