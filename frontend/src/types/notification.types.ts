export interface Notification {
  id?: number;
  userId: string;
  type: string;
  entityId: number;
  message: string;
  read?: boolean;
  created_at?: Date;
}
