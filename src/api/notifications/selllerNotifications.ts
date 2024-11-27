import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, TOKEN } from "../../constanst";
import { useAuth } from "../../provider/AuthProvider";
import { NotificationResponse } from "../../types/sellerNotifications";

export function getNotificationSeller() {
  const { user } = useAuth();
  return useQuery<NotificationResponse>({
    queryKey: ["notifications", "seller"],
    queryFn: async () => {
      const req = await fetch(`${BASE_URL}/notifications`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return await req.json();
    },
    enabled: !!user,
    staleTime: 5 * 10 * 60,
    retry: false,
  });
}
export function getNotificationUser() {
  const { user } = useAuth();
  return useQuery<NotificationResponse>({
    queryKey: ["notifications", "user"],
    queryFn: async () => {
      const req = await fetch(`${BASE_URL}/notifications/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return await req.json();
    },
    enabled: !!user,
    staleTime: 5 * 10 * 60,
    retry: false,
  });
}

export function MarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["notifications", "seller"],
    mutationFn: async (id: number) => {
      const req = await fetch(`${BASE_URL}/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return await req.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", "seller"] });
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["notifications", "seller"] });
    },
  });
}
export function MarkAsReadUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["notifications", "user"],
    mutationFn: async (id: number) => {
      const req = await fetch(`${BASE_URL}/notifications/${id}/read/user`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return await req.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", "user"] });
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["notifications", "user"] });
    },
  });
}

export function deleteNotifications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["notifications", "seller"],
    mutationFn: async (id: number) => {
      const req = await fetch(`${BASE_URL}/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return await req.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "seller"],
      });
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["notifications", "seller"] });
    },
  });
}
export function deleteNotificationsUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["notifications", "user"],
    mutationFn: async (id: number) => {
      const req = await fetch(`${BASE_URL}/notifications/${id}/user`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return await req.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "user"],
      });
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["notifications", "user"] });
    },
  });
}
