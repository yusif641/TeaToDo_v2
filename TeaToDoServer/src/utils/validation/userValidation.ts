import { z } from "zod";

export const NicknameSchema = z.object({
    nickname: z.string()
        .nonempty("Nickname can't be empty")
        .min(2, "Password should be at least 2 characters")
        .max(64, "Nickname can't be greater than 64 characters")
});

export type Nickname = z.infer<typeof NicknameSchema>;