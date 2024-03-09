const { z } = require("zod");

const registerSchema = z.object({
  userName: z
    .string({ required_error: "User Name is required" })
    .trim()
    .min(3, { message: "User Name must be at least 3 characters long" })
    .max(20, { message: "User Name must be at most 20 characters long" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(50, { message: "Email must be at most 50 characters long" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .max(10, { message: "Phone number must be at most 10 characters long" }),
  location: z
    .string({ required_error: "Location is required" })
    .trim()
    .min(5, { message: "Location must be at least 5 characters long" })
    .max(50, { message: "Location must be at most 50 characters long" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(50, { message: "Email must be at most 50 characters long" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),
});

module.exports = { registerSchema, loginSchema };
