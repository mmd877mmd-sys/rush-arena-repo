import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // shows error under confirmPassword field
  });
export const passwordMatchSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // shows error under confirmPassword field
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty("Password is required"), // just required, no min length
});
export const emailCheckSchema = z.object({
  email: z.string().email("Invalid email address"),
});
export const categorySchema = z.object({
  categoryName: z.string().min(1, "category name is required"),
  slugName: z.string().optional(),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters long")
    .max(100, "Product name too long"),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be URL friendly (e.g. my-product-name)"
    ),

  category: z.string().min(1, "Please select a category"),
  originalPrice: z.coerce
    .number({
      required_error: "Original price is required",
      invalid_type_error: "Original price must be a number",
    })
    .positive("Original price must be a positive number"),

  discountPercentage: z.coerce
    .number()
    .min(0, "Discount percent must be between 0 and 100")
    .max(100, "Discount percent must be between 0 and 100")
    .optional(),

  sellingPrice: z.coerce
    .number({
      required_error: "Final price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be a positive number"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description is too long"),
});
