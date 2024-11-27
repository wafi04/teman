import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RegisterSchema, RegisterInput } from "../../validation/auth";
import { RegisterMutation } from "../../api/auth_register";
import { toast } from "sonner";

export function Register() {
  const create = RegisterMutation();
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirmation: false,
  });

  // Toggle visibility password
  const togglePasswordVisibility = (
    field: "password" | "passwordConfirmation"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  // State untuk form dan error
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur", // Validasi saat input kehilangan fokus
  });

  // Handler submit form
  const onSubmit = async (data: RegisterInput) => {
    try {
      // Simulasi proses registrasi
      create.mutate(data);
      console.log("Register berhasil:", data);

      // Reset form setelah berhasil
      reset();
    } catch (error: any) {
      console.error("Error registrasi:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Buat Akun Baru</CardTitle>
          <CardDescription>
            Silakan isi formulir di bawah untuk membuat akun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              {/* Input Nama */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Input Email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Input Password */}
              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Masukkan password"
                    {...register("password")}
                    className="pr-10" // Tambahkan padding untuk tombol
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => togglePasswordVisibility("password")}>
                    {showPassword.password ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Input Konfirmasi Password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passwordConfirmation">
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Input
                    id="passwordConfirmation"
                    type={
                      showPassword.passwordConfirmation ? "text" : "password"
                    }
                    placeholder="Ulangi password"
                    {...register("passwordConfirmation")}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() =>
                      togglePasswordVisibility("passwordConfirmation")
                    }>
                    {showPassword.passwordConfirmation ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {errors.passwordConfirmation && (
                  <p className="text-red-500 text-sm">
                    {errors.passwordConfirmation.message}
                  </p>
                )}
              </div>
            </div>

            <CardFooter className="flex justify-between mt-4 p-0">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Daftar"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
