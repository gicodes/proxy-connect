import { expressjwt } from 'express-jwt';
import getConfig from 'next/config';
import util from 'util';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware({req, res}: any) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth/sign-up',
            '/api/auth/sign-in'
        ]
    });

    return util.promisify(middleware)(req, res);
}