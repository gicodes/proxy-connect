import getConfig from "next/config";
import { businessRepo } from "../../../lib/api/mongodb/repo";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";

const { serverRuntimeConfig } = getConfig();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Type in your username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null; 
        const { username, password } = credentials;
        const userExists = await businessRepo.retrieve({ username, password });

        if (!userExists) throw new Error("No user found")

        if (userExists) return userExists as any;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || serverRuntimeConfig.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || serverRuntimeConfig.GOOGLE_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || serverRuntimeConfig.NEXTAUTH_SECRET,
  pages: {
    // newer updates should create 'auth/error', 
    // 'verify-request' and 'new-user' landings
    error: '/404',
    verifyRequest: '/auth/verify-request', 
    newUser: '/' 
  },
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session }) {
      // send properties to the client, like token.id
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  // enabling debug messages in the console for technical problems
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
