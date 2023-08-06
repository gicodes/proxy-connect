import NextAuth, { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update"){
        return {...token, ...session}
      }
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  }
}
export default NextAuth(authOptions)