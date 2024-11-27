import { z } from "zod";

// Skema Validasi Registrasi
export const RegisterSchema = z
  .object({
    name: z
      .string({ required_error: "Nama harus diisi" })
      .min(2, { message: "Nama minimal 2 karakter" })
      .max(50, { message: "Nama maksimal 50 karakter" })
      .trim(),

    email: z
      .string({ required_error: "Email harus diisi" })
      .email({ message: "Format email tidak valid" })
      .toLowerCase()
      .trim(),

    password: z
      .string({ required_error: "Password harus diisi" })
      .min(8, { message: "Password minimal 8 karakter" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial",
        }
      ),

    passwordConfirmation: z.string({
      required_error: "Konfirmasi password harus diisi",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password tidak cocok",
    path: ["passwordConfirmation"],
  });

// Type untuk validasi TypeScript
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email harus diisi" })
    .email({ message: "Format email tidak valid" })
    .toLowerCase()
    .trim(),

  password: z.string({ required_error: "Password harus diisi" }),
});
export type loginInput = z.infer<typeof loginSchema>;
