import { z } from "zod";

// Product validations
const maxFileSize = 1024 * 1024 * 5; // 5MB in Bits
const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

const imageSchema = z
  .instanceof(File, { message: "Each file must be an image" })
  .refine((file) => file.size <= maxFileSize, {
    message: "Max size allowed for each image is 5MB",
  })
  .refine((file) => imageTypes.includes(file.type), {
    message: "Only .jpeg, .jpg and .png images are allowed",
  });

export const zodProduct = z.object({
  product: z
    .string()
    .min(1, { message: "Product must contain at least 1 character" }),
  images: z
    .array(imageSchema)
    .refine((files) => files.length > 0, {
      message: "At least 1 image is required",
    }),
  description: z
    .string()
    .min(1, { message: "Description must conatin at least 1 character" }),
  price: z.coerce
    .number()
    .int()
    .min(1, { message: "Price must be greater than or equal to 1" }),
});

export const zodAdmin = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Only characters and numbers are allowed for username",
    })
    .min(3, { message: "Username must contain at least 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});
