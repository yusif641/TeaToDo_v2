import { z } from "zod";

export const signInFormSchema = z.object({
    email: z.string({ message: "Email must be a string" })
        .email({ message: "Email is incorrect" })
        .nonempty({ message: "Email is required" }),
    password: z.string({ message: "Password must be a string" })
        .min(8, { message: "Password should be at least 8 symbols long" })
        .max(16, ({ message: "Password can't be longer than 16 symbols" }))
        .nonempty({ message: "Password is requiered" }),
});

export type signInFields = z.infer<typeof signInFormSchema>;