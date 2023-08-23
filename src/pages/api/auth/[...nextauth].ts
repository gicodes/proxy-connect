import getConfig from "next/config";
import { ridersRepo } from "../repo";
import clientPromise from "@/lib/api/mongodb";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const { serverRuntimeConfig } = getConfig();

export const authOptions: NextAuthOptions = {
  // using MongoDBAdapter (not supported by my codebase)
  // adapter: MongoDBAdapter(clientPromise),
  // providers are necessary for next-auth to work
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
  // secret is critical for redirect requests
  secret: process.env.NEXTAUTH_SECRET,
  // pages are optional but critical for this sign-in flow
  pages: {
    signIn: '/auth/sign-in',
    error: '/404',
  },
  // callbacks handle session and jwt strategy
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.idToken;
      // console.log(`next auth:`, {session})
      return session;
    },
    async jwt({ session, token, trigger}) {
      if (trigger === "update" && session?.name) {
        token.name = session;
      }
      return {...token, ...session};
    },
  },
  session: {
    // Choose how you want to save user session. Default is 'JWT', an encrypted (JWE) stored in the session cookie.
    // If you use adapter, it defaults to `database` instead. You can still force JWT session by explicitly defining `jwt`.
    strategy: "jwt"
  }
}

export default NextAuth(authOptions);