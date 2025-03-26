import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({ required_error: "Name is required and must be string" }),
  email: z
    .string({ required_error: "Email is required and must be string" })
    .email(),
  password: z.string({ required_error: "Password is required" }),
  phone: z.string({ required_error: "Please provide phone number" }),
});

export const UserValidation = {
  userValidationSchema,
};
