import { z } from "zod";

export const SignupSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(8, "Username must be at least 8 characters long")
    .max(128, "Username must be no longer than 128 characters")
    .regex(/^[a-z0-9]+$/, "Username must be lowercase alphanumeric"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be no longer than 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: z
    .string() 
}).refine(
    data => data.password === data.confirmPassword, 
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const SigninSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(8, "Username must be at least 8 characters long")
    .max(128, "Username must be no longer than 128 characters"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be no longer than 128 characters"),
});

