export interface PinData {
  id: string;
  user_id: string;
  title: string;
  description: string;
  file_url: string;
  link: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  file_type: string;
  profile_picture_url: string;
}

export interface CreatePinInput {
  user_id: number;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  link: string;
  profile_picture_url: string;
  created_by: string;
  created_at: Date;
}

export interface UpdatePinInput {
  user_id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  link: string;
  updated_at: Date;
  created_by: string;
  profile_picture_url: string;
}
