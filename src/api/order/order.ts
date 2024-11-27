import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BASE_URL, TOKEN } from "../../constanst";
import { Checkout } from "../../types/checkout";
import {
  CheckoutForm,
  CheckoutResponse,
  Order,
  OrderForm,
} from "../../types/order";

export function useCreateCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (add: OrderForm) => {
      const response = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`, // Sesuaikan cara penyimpanan token
        },
        body: JSON.stringify(add),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal membuat order");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate queries terkait untuk refresh data
      queryClient.invalidateQueries({
        queryKey: ["cart"],
        type: "active",
      });

      // Notifikasi berhasil
      toast.success("Order berhasil dibuat", {
        description: `Order ID: ${data.id}`,
      });
    },

    // Gagal membuat order
    onError: () => {
      // Notifikasi error
      toast.error("Gagal membuat order");
    },
  });
}

export function getCart() {
  const { data, isLoading, error } = useQuery<Order>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`, // Sesuaikan cara penyimpanan token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal membuat order");
      }

      return response.json();
    },
    gcTime: 5 * 60 * 60,
    staleTime: 5 * 60 * 60,
    retry: false,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function clearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/order/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`, // Sesuaikan cara penyimpanan token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal membuat order");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("delete cart success");
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error deleting cart");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["cart"] });
    },
  });
}

export function removeItemsFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart", "cartItems"],
    mutationFn: async (id: string) => {
      const response = await fetch(`${BASE_URL}/order/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`, // Sesuaikan cara penyimpanan token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal membuat order");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("delete items success");
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error deleting items");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["cart"] });
    },
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (checkout: CheckoutForm) => {
      const response = await fetch(`${BASE_URL}/order/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`, // Sesuaikan cara penyimpanan token
        },
        body: JSON.stringify(checkout),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal Checkout");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Checkout success");
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Fix the query key to match
    },
    onError: (error) => {
      toast.error("Error Checkout items");
      console.error(error);
      queryClient.cancelQueries({ queryKey: ["cart"] });
    },
  });
}

export function userGetCheckout() {
  const { data, isLoading, error } = useQuery<CheckoutResponse>({
    queryKey: ["cart", "checkout"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/order/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`, // Sesuaikan cara penyimpanan token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal membuat order");
      }

      return response.json();
    },
    gcTime: 5 * 60 * 60,
    staleTime: 5 * 60 * 60,
    retry: false,
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
  };
}
