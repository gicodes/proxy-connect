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
      async authorize(credentials, req) {
        // The following error is casued by next-auth strictMode
        const { username, password } = credentials;
        // To fix it, set strictmode: false (Not Recommended)  

        if (!credentials) {
          throw new Error("Credentials are required")
        }

        const userExists = await ridersRepo.retrieve({username, password});

        if (!userExists) {
          throw new Error("No user found")
        };

        if (userExists) {
          return userExists
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || serverRuntimeConfig.connectionString,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || serverRuntimeConfig.connectionString,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/sign-in'
  },
  // the rest of the code is not required
  
  // callbacks: {
  //   jwt({ token, trigger, session }) {
  //     if (trigger === "update" && session.name){
  //       token.name = session
  //     }
  //     return { token, ...session }
  //   },
  // }
}

export default NextAuth(authOptions);
