import getConfig from "next/config";
import { ridersRepo } from "../riders/repo";
import { randomBytes, randomUUID } from "crypto";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const { serverRuntimeConfig } = getConfig();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: { 
        username: {label: 'Username', type: 'text'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        if (!credentials) return; 
        const { username, password } = credentials;
        // handle case of empty or no credentials here

        const userExists = await ridersRepo.retrieve({ username, password });
        // handle case of incorrect credentials here
        if (!userExists) {
          throw new Error("No user found")
        };
        if (userExists) {
          return userExists as any;
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || serverRuntimeConfig.connectionString,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || serverRuntimeConfig.connectionString,
    })
  ],
  // secret is not required but critical for redirect requests
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/sign-in',
    error: '/404',
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "database",
  
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
    
    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  }
}

export default NextAuth(authOptions);
