import type { ValidationError } from "zod-validation-error";

type ApiErrors = ValidationError | string[] | null;

class ApiError extends Error {
    public status: number;
    public errors: ApiErrors;

    constructor(message: string, status: number, errors: ApiErrors = null) {
        super(message);

        this.status = status;
        this.errors = errors;
    };

    public static UnAuthorized() {
        throw new ApiError("User is unauthorized", 401);
    };

    public static BadRequest(message: string, errors: ApiErrors = null) {
        throw new ApiError(message, 400, errors);
    };

    public static NotFound(message: string) {
        throw new ApiError(message, 404);
    };
};

export default ApiError;