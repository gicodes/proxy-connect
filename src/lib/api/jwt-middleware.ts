import { expressjwt } from 'express-jwt';
import getConfig from 'next/config';
import util from 'util';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

export { default } from "next-auth/middleware"

// secure certain pages with config object and a matcher:
export const config = { matcher: ["/connect", "profile"] }

function jwtMiddleware({req, res}: any) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/'
        ]
    });

    return util.promisify(middleware)(req, res);
}