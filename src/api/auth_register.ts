import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constanst";
import { RegisterInput } from "../validation/auth";

const registerUser = async (RegisterInput: RegisterInput) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: RegisterInput.name,
      email: RegisterInput.email,
      password: RegisterInput.password,
      password_confirmation: RegisterInput.passwordConfirmation,
    }),
  });

  return await response.json();
};

export function RegisterMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterInput) => registerUser(data),
    onError: (error: Error) => {
      queryClient.cancelQueries({ queryKey: ["user"] });
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("register success");
      navigate("/login");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
