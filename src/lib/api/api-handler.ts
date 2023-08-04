import { errorHandler } from './error-handler';
import { jwtMiddleware } from './jwt-middleware';

type HttpMethodHandler = {
    [key: string]: (req: Request, res: Response) => Promise<Response>;
};

export { apiHandler };

function apiHandler(handler: HttpMethodHandler) {
    return async ({req, res}: any) => {
        const method = req.method.toLowerCase();

        // check handler supports HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // global middleware
            await jwtMiddleware(req);

            // route handler
            await handler[method](req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}