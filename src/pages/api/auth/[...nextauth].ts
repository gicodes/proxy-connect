import getConfig from "next/config";
import { ridersRepo } from "../riders/repo";
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
    signIn: '/auth/sign-in'
  },
}

export default NextAuth(authOptions);
