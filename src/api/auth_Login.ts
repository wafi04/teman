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

  return await response.json();
};

export function LoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: loginInput) => LoginUser(data),
    onError: (error: Error) => {
      queryClient.cancelQueries({ queryKey: ["user"] });
      toast.success("Registered errorr");
    },
    onSuccess: (data) => {
      toast.success("register success");
      console.log(data);
      localStorage.setItem("token", data.data.token);
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
