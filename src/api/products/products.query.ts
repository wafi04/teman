import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { BASE_URL, TOKEN } from "../../constanst";
import {
  Product,
  ProductResponse,
  ProductsForm,
  ProductVariant,
} from "../../types/products";
import { ProductsService } from "./products.crud";

const products = new ProductsService();

export function useCreateProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["products"],
    mutationFn: (data: ProductsForm) => products.createProducts(data),
    onSuccess: () => {
      toast.success("Create Products success");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error creating products");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["products"],
    mutationFn: (data: ProductsForm) => products.updateProduct(data),
    onSuccess: () => {
      toast.success("Update Products success");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error updating products");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["products"] });
    },
  });
}
export function useGetProducts(search?: string) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      if (search) {
        queryParams.append("search", search);
      }

      const req = await fetch(`${BASE_URL}/products${queryParams.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!req.ok) {
        toast.error("Error get product");
        throw new Error("Failed to get product");
      }

      return await req.json();
    },
    staleTime: 5 * 10 * 60,
    select: (products: any) => products.data,
  });
}
export function useCreateVariants() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["variants"],
    mutationFn: (data: ProductVariant) => products.createVariants(data),
    onSuccess: () => {
      toast.success("Create Variants success");
      queryClient.invalidateQueries({ queryKey: ["variants"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error creating variants");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["variants"] });
    },
  });
}

export function useUpdateVariants() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["variants"],
    mutationFn: (data: ProductVariant) => products.updateVariants(data),
    onSuccess: () => {
      toast.success("Update Variants success");
      queryClient.invalidateQueries({ queryKey: ["variants"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error updating variants");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["variants"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["products"],
    mutationFn: (productId: string) => products.DeleteProducts(productId),
    onSuccess: () => {
      toast.success("Delete Variants success");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error Deleteing variants");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["products"] });
    },
  });
}
export function useDeleteVariants() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["variants"],
    mutationFn: (variantsId: string) => products.DeleteVariants(variantsId),
    onSuccess: () => {
      toast.success("Delete Variants success");
      queryClient.invalidateQueries({ queryKey: ["variants"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error Deleteing variants");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["variants"] });
    },
  });
}

export function useProductById(id: string) {
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["products", id],
    queryFn: () => products.GetProductById(id),
    enabled: !!id,
    staleTime: 5 * 10 * 60,
  });

  return {
    data,
    isLoading,
    error,
  };
}
