import * as z from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;