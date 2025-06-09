// import { validateAPIKey } from "./api_key.js";

// Set up middleware using a function
const middleware = (f) => {
    return async (req, res, next) => {
        try {
            await f(req, res, next);
            next();
        } catch (error) {
            if (error instanceof Response) {
                // If it's a response object, send that response
                return error;
            }
            // Otherwise, pass the error to the next middleware
            next(error);
        }
    };
};

export const middleware_null = middleware(async (req, res) => {
});