import getConfig from 'next/config';
import { userService } from 'services';

/* 
The fetch wrapper is a lightweight wrapper around the native browser
fetch() function used to simplify the codes for making HTTP requests. 
It contains GET, POST, PUT & DELETE requests, automatically handles parsing of JSON data 
from responses, and throws an error if the HTTP response is not successful (!response.ok). 
If response is 401 Unauthorized or 403 Forbidden, the user is automatically logged out of the Next app.
The authHeader() function adds a JWT token to the HTTP auth header of the request if user is logged in,
and the request is to the application API URL. With the fetch wrapper a POST request can be made as simply as this: fetchWrapper.post(url, body).
*/

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: any) {
    return async (url: any | URL, body: any) => {
        const requestOptions = {
            method,
            body,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.body = JSON.stringify(body);
        }
        const response = await fetch(url);
      return handleResponse(response);
    }
}

// helper functions

function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user?.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response: Response) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
        if ([401, 403].includes(response.status) && userService.userValue) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            userService.logout();
        }

        // get error message from body or default to response status
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}