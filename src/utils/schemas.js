import { z } from "zod";

// Product validations
const fileSchema = z.instanceof(File, { message: "At least 1 image" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

export const zodProduct = z.object({
  product: z
    .string()
    .min(1, { message: "Product must contain at least 1 character" }),
  images: z
    .array(imageSchema.refine((file) => file.size > 0, "Image is required"))
    .max(4, { message: "Maximum of 4 images allowed" }),
  description: z
    .string()
    .min(1, { message: "Description must conatin at least 1 character" }),
  price: z.coerce
    .number()
    .int()
    .min(1, { message: "Price must be greater than or equal to 1" }),
});