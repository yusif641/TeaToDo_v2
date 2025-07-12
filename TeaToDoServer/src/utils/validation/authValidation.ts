import { z } from "zod";

export const UserAuthSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(8, "Password should be at least 8 characters")
        .max(16, "Password can't be greater than 16 characters")
});

export type UserAuth = z.infer<typeof UserAuthSchema>;