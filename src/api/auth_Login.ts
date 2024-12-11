import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constanst";
import { loginInput } from "../validation/auth";

const LoginUser = async (loginInput: loginInput) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: loginInput.email,
      password: loginInput.password,
    }),
  });
  if (!response.ok) {
    toast.error("Password atau email salah");
  }

  return await response.json();
};

export function LoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: loginInput) => LoginUser(data),
    onError: (error: Error) => {
      toast.error("login errorr");
      queryClient.cancelQueries({ queryKey: ["user"] });
    },
    onSuccess: (data) => {
      // Simpan token
      localStorage.setItem("token", data.data.token);

      // Invalidate user queries
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Success toast
      toast.success("Login berhasil");

      // Navigate ke dashboard
      window.location.href = "/dashboard";
    },
  });
}
