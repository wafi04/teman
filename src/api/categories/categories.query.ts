import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CategoriesForm, CategoriesResponse } from "../../types/categories";
import { CategoriesService } from "./categories.crud";

const category = new CategoriesService();
export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories"],
    mutationFn: (data: CategoriesForm) => category.create(data),
    onSuccess: () => {
      toast.success("create Categories success");
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Fix the query key to match
    },
    onError: () => {
      toast.error("Error creating category");
      queryClient.cancelQueries({ queryKey: ["categories"] });
    },
  });
}

export function GetCategory() {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: () => category.getCategory(),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["categories"],
    mutationFn: (data: CategoriesForm) => category.updateCategory(data),
    onSuccess: () => {
      toast.success("create Categories success");
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Fix the query key to match
    },
    onError: () => {
      toast.error("Error creating category");
      queryClient.cancelQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories"],
    mutationFn: (categoryId: number) => category.Delete(categoryId),
    onSuccess: () => {
      toast.success("Delete Categories success");
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Fix the query key to match
    },
    onError: () => {
      toast.error("Error creating category");
      queryClient.cancelQueries({ queryKey: ["categories"] });
    },
  });
}
