import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';


export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Auth0Provider({
      clientId: <string> process.env.AUTH0_ID,
      clientSecret: <string> process.env.AUTH0_SECRET,
      issuer: <string> process.env.AUTH0_ISSUER,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          verified: true
        };
      }
    }),
    GoogleProvider({
      clientId: <string> process.env.GOOGLE_ID,
      clientSecret: <string> process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.user? = user.name;
      return session;
    }
  },
}

export default NextAuth(authOptions)