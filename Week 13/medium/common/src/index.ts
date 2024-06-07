import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Type inference
export type SignupInput = z.infer<typeof signupInput>;
