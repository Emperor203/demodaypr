import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    if (process.env.NODE_ENV === "production" && !isBuildPhase) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    console.warn(
      `[auth] Missing env ${name}; provider will be disabled${isBuildPhase ? " during build" : " in dev"}.`
    );
    return null;
  }
  return value;
}

function providerIfConfigured(provider, idName, secretName) {
  const clientId = requireEnv(idName);
  const clientSecret = requireEnv(secretName);
  if (!clientId || !clientSecret) {
    return null;
  }
  return provider({ clientId, clientSecret });
}

const isNetlify = process.env.NETLIFY === "true";
const isDev = process.env.NODE_ENV !== "production";
const inferredAuthUrl =
  process.env.AUTH_URL || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL || process.env.URL;

// Netlify provides URL/DEPLOY_* vars; map them to AUTH_URL for NextAuth v5.
if (!process.env.AUTH_URL && inferredAuthUrl) {
  process.env.AUTH_URL = inferredAuthUrl;
}

const providers = [
  providerIfConfigured(GitHub, "GITHUB_ID", "GITHUB_SECRET"),
  providerIfConfigured(Google, "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"),
].filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  trustHost: isNetlify || isDev,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
});
