export type Notifications = {
  id: number;
  seller_id: number;
  order_id: string;
  title: string;
  message: string;
  is_read: number; // Alternatively, you could use a boolean if `0` and `1` map to `false` and `true`.
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
};

export interface NotificationResponse {
  data: Notifications[];
  total_unread: number;
}
