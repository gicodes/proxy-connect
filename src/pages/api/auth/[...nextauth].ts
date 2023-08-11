import { ridersRepo } from "../riders/repo";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req: any) {
        // The following (credentials) code is not in use... 
        // reasons include security, fetching custom API route with /URL path
        // may require debugging to use. See sign-in.tsx > AuthPage > map().callback
        credentials = req.body;
        const user = await ridersRepo.retrieve(req.body);
        if (user) {
          return user
        }
        return null
      }
    }),
  ],
  
  pages: {
    signIn: "/auth/sign-in",
  },  
  
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session.name){
        token.name = session
      }
      return { token, ...session }
    },

    // async session({ session, token }) {
    //   session.user = token as any;
    //   return session;
    // }
  }
}

export default NextAuth(authOptions);
