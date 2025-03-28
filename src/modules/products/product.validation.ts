import { z } from "zod";

const productValidationSchema = z.object({
  title: z.string({ required_error: "Title is required and must be string" }),
  description: z.string({
    required_error: "Description is required and must be string",
  }),
  price: z.number({ required_error: "Price is required" }),
  condition: z.string({
    required_error: "Please provide the condition of the product",
  }),
  images: z.string().array().optional(),
  userId: z.string(),
});

export const ProductValidation = {
  productValidationSchema,
};
