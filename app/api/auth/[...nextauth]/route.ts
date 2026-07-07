import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/options";

// Standard NextAuth route handler. Works as soon as Google credentials are
// present in the environment (see .env.example). TODO: add real credentials.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
