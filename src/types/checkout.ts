import { ProductVariant } from "./products";

export interface CheckoutItem {
  id: string;
  order_id: string;
  product_variant_id: string;
  inventory_id: number;
  quantity: number;
  price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
  product_variant: ProductVariant;
}

export interface Checkout {
  id: string;
  user_id: number;
  status: string;
  total_amount: string;
  shipping_address: string | null;
  payment_method: string | null;
  checkout_at: string | null;
  created_at: string;
  updated_at: string;
  order_items: CheckoutItem[];
}
