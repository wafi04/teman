import { Inventory, Product } from "./products";

export interface OrderForm {
  inventory_id: number;
  quantity: number;
  variant_id: string;
}

export interface CartItemsProps {
  items: OrderItem;
  onRemove: () => void;
}

export type STATUS =
  | "cart"
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type CheckoutForm = {
  shipping_address: string;
  payment_method: string;
  bank_name?: string;
  virtual_account?: string;
};
type ProductVariant = {
  id: string;
  product_id: string;
  color: string;
  image: string;
  product: Product;
  price: string;
  sku: string;
  created_at: string;
  updated_at: string;
};

type OrderItem = {
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
  inventory: Inventory;
};

export type Order = {
  id: string;
  user_id: number;
  user?: {
    name: string;
    id: string;
    email: string;
  };
  status: STATUS;
  total_amount: string;
  shipping_address: string | null;
  bank_name: string | null;
  virtual_account: string | null;
  payment_method: string | null;
  checkout_at: string | null;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
};

export interface CheckoutResponse {
  data: Order[];
}
