import type { ZodError } from "zod/v4";

class ApiError extends Error {
    public status: number;
    public errors: ZodError | null;

    constructor(message: string, status: number, errors: ZodError | null = null) {
        super(message);

        this.status = status;
        this.errors = errors;
    };

    public static UnAuthorized() {
        throw new ApiError("User is unauthorized", 401);
    };

    public static BadRequest(message: string, errors: ZodError | null = null) {
        throw new ApiError(message, 400, errors);
    };

    public static NotFound(message: string) {
        throw new ApiError(message, 404);
    };
};

export default ApiError;