import z from "zod";

export const signupInput = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const blogInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
});

// Type inference
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type BlogInput = z.infer<typeof blogInput>;
