import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const isNetlify = process.env.NETLIFY === "true";
const isDev = process.env.NODE_ENV !== "production";
const inferredAuthUrl =
  process.env.AUTH_URL || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL || process.env.URL;

// Netlify provides URL/DEPLOY_* vars; map them to AUTH_URL for NextAuth v5.
if (!process.env.AUTH_URL && inferredAuthUrl) {
  process.env.AUTH_URL = inferredAuthUrl;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  trustHost: isNetlify || isDev,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
});
