import { CategoriesForm } from "./categories";
import { UserData } from "./user";

export interface ProductsForm {
  id?: string;
  seller_id: number;
  name: string;
  description: string;
  categoryId: number;
}

export interface ProductResponse {
  data: Product[];
  current_page: number;
  last_page: number;
  total: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  variants: ProductVariant[];
  seller: UserData;
  seller_id: number;
  category: CategoriesForm;
  category_id: number;
}

export interface ProductVariant {
  id?: string;
  product_id: string;
  color: string;
  price: number;
  sku?: string;
  image: string | File | null;
  inventories?: Inventory[];
}

export interface Inventory {
  id?: number;
  size: string;
  quantity: number;
}
