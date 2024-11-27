export interface CategoriesForm {
  id?: number;
  name: string;
  description: string;
  image_url: File | string | null;
  is_active: boolean;
}

export interface CategoriesResponse {
  status: boolean;
  data: CategoriesForm[];
}
