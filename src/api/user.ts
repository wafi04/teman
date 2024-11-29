import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constanst";

// Hook untuk fetch profile
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const { data } = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    },
    retry: 1,
    enabled: !!localStorage.getItem("token"), // Hanya fetch jika token ada
    staleTime: 5 * 60 * 1000, // Data dianggap fresh selama 5 menit
  });
}
