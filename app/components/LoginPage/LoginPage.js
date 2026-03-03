"use client";

import { Cormorant_Garamond, Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useTheme } from "../Theme/ThemeProvider";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoginPage() {
  const { theme, toggleTheme } = useTheme();
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formMessage, setFormMessage] = useState("");

  const handleProviderSignIn = async (provider) => {
    const setLoading = provider === "github" ? setIsGithubLoading : setIsGoogleLoading;

    try {
      setFormMessage("");
      setLoading(true);
      await signIn(provider, {
        callbackUrl: "/",
        ...(provider === "google" ? { prompt: "select_account" } : {}),
      });
    } catch {
      setFormMessage("Sign in failed. Please try again.");
      setLoading(false);
    }
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    setFormMessage("Email/password login is not configured yet. Use GitHub or Google sign in.");
  };

  return (
    <main className={`${bodyFont.className} min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
      <div className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-[420px]">
            <div className="flex items-center justify-between gap-4">
              <p className={`${headingFont.className} text-[20px] tracking-wide`}>Gizhar.</p>
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]"
                aria-label="Switch color theme"
              >
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>

            <h1 className={`${headingFont.className} mt-16 text-[54px] leading-[0.95] sm:text-[64px]`}>
              Welcome back
            </h1>
            <p className="mt-3 text-[15px] text-[var(--color-muted)]">
              The faster you fill up, the faster you get a ticket
            </p>

            <form className="mt-10 space-y-5" onSubmit={handleEmailSubmit}>
              <label className="block">
                <span className={`${headingFont.className} mb-2 block text-[34px] leading-none`}>Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full border border-[var(--color-border)] bg-transparent px-4 text-[15px] outline-none transition focus:border-[var(--foreground)]"
                />
              </label>

              <label className="block">
                <span className={`${headingFont.className} mb-2 block text-[34px] leading-none`}>Password</span>
                <input
                  type="password"
                  placeholder="********"
                  className="h-12 w-full border border-[var(--color-border)] bg-transparent px-4 text-[15px] outline-none transition focus:border-[var(--foreground)]"
                />
              </label>

              <div className="flex items-center justify-between pt-1 text-[14px]">
                <label className="flex cursor-pointer items-center gap-2 text-[var(--color-muted)]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 border border-[var(--color-border)]"
                  />
                  Remember me
                </label>
                <button type="button" className="text-[var(--foreground)] hover:underline">
                  Forgot Password
                </button>
              </div>

              <button
                type="submit"
                className="mt-3 h-12 w-full bg-[var(--color-accent)] text-[25px] text-[var(--color-on-accent)] transition hover:opacity-90"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => handleProviderSignIn("google")}
                disabled={isGoogleLoading || isGithubLoading}
                className="flex h-12 w-full items-center justify-center gap-3 border border-[var(--color-border)] bg-[var(--color-surface)] text-[28px] text-[var(--foreground)] transition hover:bg-[var(--color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="text-[19px] leading-none">{isGoogleLoading ? "..." : "G"}</span>
                <span className={`${headingFont.className} text-[34px] leading-none`}>
                  {isGoogleLoading ? "Redirecting..." : "Sign In with Google"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderSignIn("github")}
                disabled={isGithubLoading || isGoogleLoading}
                className="flex h-12 w-full items-center justify-center gap-3 border border-[var(--color-border)] bg-[var(--color-surface)] text-[28px] text-[var(--foreground)] transition hover:bg-[var(--color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="text-[19px] leading-none">{isGithubLoading ? "..." : "GH"}</span>
                <span className={`${headingFont.className} text-[34px] leading-none`}>
                  {isGithubLoading ? "Redirecting..." : "Sign In with GitHub"}
                </span>
              </button>

              {formMessage ? <p className="text-sm text-[#ef4444]">{formMessage}</p> : null}
              {rememberMe ? (
                <p className="text-xs text-[var(--color-muted)]">
                  Your sign-in session stays active and login page will auto-redirect you next time.
                </p>
              ) : null}
            </form>

            <p className="mt-16 text-center text-[15px] text-[var(--color-muted)]">
              Don&apos;t have an account?{" "}
              <Link href="#" className="font-semibold text-[var(--foreground)] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </section>

        <section className="relative hidden min-h-screen lg:block">
          <Image src="/loginmodule.svg" alt="Login visual" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
          <div className="absolute inset-0 flex items-end p-10 text-white">
            <div>
              <p className={`${headingFont.className} text-[56px] leading-none`}>Your Visual</p>
              <p className="mt-3 max-w-[420px] text-sm text-white/85">Replace image at /public/login-visual.jpg</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
