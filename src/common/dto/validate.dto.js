import { z } from "zod";

export const registerDto = z.object({
  full_name: z.string().trim().min(2, "name required"),
  email: z.string().email(),
  password: z.string().min(6, "the password required"),
});

export const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6, "the password required"),
});
