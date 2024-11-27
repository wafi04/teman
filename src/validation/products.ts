import { TypeOf, z } from "zod";

export const ProductsSchema = z.object({
  name: z.string({ required_error: "name  harus diisi" }).trim().max(50).min(5),
  description: z
    .string({ required_error: "name  harus diisi" })
    .max(200)
    .min(2),
  categoryId: z.number(),
  seller_id: z.number(),
});

export type ProductsInput = z.infer<typeof ProductsSchema>;
export const productVariantSchema = z.object({
  variants: z
    .array(
      z.object({
        color: z.string().min(1, { message: "Color is required" }),
        price: z.coerce.number().min(0, { message: "Price must be positive" }),
        sku: z.string().min(1, { message: "SKU is required" }),
        inventories: z
          .array(
            z.object({
              size: z.string().min(1, { message: "Size is required" }),
              quantity: z.coerce
                .number()
                .min(0, { message: "Quantity must be non-negative" }),
            })
          )
          .min(1, { message: "At least one inventory item is required" }),
      })
    )
    .min(1, { message: "At least one variant is required" }),
});

export type ProductVariantFormData = z.infer<typeof productVariantSchema>;
