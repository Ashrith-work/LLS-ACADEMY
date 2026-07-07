import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth configuration — Google is the primary signup method.
 *
 * TODO: add real credentials to .env(.local):
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET
 * Until then the UI uses the dev bypass (see lib/auth/dev-auth.tsx) so the
 * whole funnel is testable without OAuth.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "unset-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "unset-google-client-secret",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "dev-only-secret-change-me",
  pages: {
    // Signup happens inside the goal-router gate, not a separate page.
    signIn: "/start",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
};
