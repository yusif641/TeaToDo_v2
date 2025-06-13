import { prisma } from "../../config/prismaClient";
import ApiError from "../exceptions/ApiError";

export const checkThought = async (thoughtId: string) => {
    const thought = await prisma.thoughts.findUnique({ where: { thought_id: thoughtId } });
    if (!thought) throw ApiError.NotFound("Couldn't find thought with that id");
}