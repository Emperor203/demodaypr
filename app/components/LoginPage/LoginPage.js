"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "../Theme/ThemeProvider";


export default function LoginPage() {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formMessage, setFormMessage] = useState("");

  const isDark = mounted && theme === "dark";

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
      setFormMessage("Вход не выполнен. Попробуйте еще раз.");
      setLoading(false);
    }
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    setFormMessage("Вход по email/паролю пока не настроен. Используйте вход через GitHub или Google.");
  };

  return (
    <main className="font-body min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-[420px]">
            <div className="flex items-center justify-between gap-4">
              <p className="font-heading text-[20px] tracking-wide">Gizhar.</p>
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]"
                aria-label="Переключить тему"
              >
                {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
              </button>
            </div>

            <h1 className="font-heading mt-10 text-[42px] leading-[0.95] sm:mt-16 sm:text-[64px]">
              С возвращением
            </h1>
            <p className="mt-3 text-[15px] text-[var(--color-muted)]">
              Чем быстрее вы заполните данные, тем быстрее получите доступ
            </p>

            <form className="mt-10 space-y-5" onSubmit={handleEmailSubmit}>
              <label className="block">
                <span className="font-heading mb-2 block text-[28px] leading-none sm:text-[34px]">Эл. почта</span>
                <input
                  type="email"
                  placeholder="Введите email"
                  className="h-12 w-full border border-[var(--color-border)] bg-transparent px-4 text-[15px] outline-none transition focus:border-[var(--foreground)]"
                />
              </label>

              <label className="block">
                <span className="font-heading mb-2 block text-[28px] leading-none sm:text-[34px]">Пароль</span>
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
                  Запомнить меня
                </label>
                <button type="button" className="text-[var(--foreground)] hover:underline">
                  Забыли пароль
                </button>
              </div>

              <button
                type="submit"
                className="mt-3 h-12 w-full bg-[var(--color-accent)] text-xl text-[var(--color-on-accent)] transition hover:opacity-90 sm:text-[25px]"
              >
                Войти
              </button>

              <button
                type="button"
                onClick={() => handleProviderSignIn("google")}
                disabled={isGoogleLoading || isGithubLoading}
                className="flex h-12 w-full items-center justify-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] px-2 text-[var(--foreground)] transition hover:bg-[var(--color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-60 sm:gap-3"
              >
                {isGoogleLoading ? (
                  <span className="text-sm leading-none sm:text-[19px]">...</span>
                ) : (
                  <Image src="/googlelogo.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
                )}
                <span className="font-heading text-xl leading-none sm:text-[34px]">
                  {isGoogleLoading ? "Перенаправляем..." : "Войти через Google"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderSignIn("github")}
                disabled={isGithubLoading || isGoogleLoading}
                className="flex h-12 w-full items-center justify-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] px-2 text-[var(--foreground)] transition hover:bg-[var(--color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-60 sm:gap-3"
              >
                {isGithubLoading ? (
                  <span className="text-sm leading-none sm:text-[19px]">...</span>
                ) : (
                  <Image src="/githublogo.svg" alt="GitHub" width={20} height={20} className="h-5 w-5" />
                )}
                <span className="font-heading text-xl leading-none sm:text-[34px]">
                  {isGithubLoading ? "Перенаправляем..." : "Войти через GitHub"}
                </span>
              </button>

              {formMessage ? <p className="text-sm text-[#ef4444]">{formMessage}</p> : null}
              {rememberMe ? (
                <p className="text-xs text-[var(--color-muted)]">
                  Сессия входа останется активной, и в следующий раз страница входа автоматически перенаправит вас.
                </p>
              ) : null}
            </form>

            <p className="mt-12 text-center text-[15px] text-[var(--color-muted)] sm:mt-16">
              Нет аккаунта?{" "}
              <Link href="#" className="font-semibold text-[var(--foreground)] hover:underline">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </section>

        <section className="relative hidden min-h-screen lg:block">
          <Image src="/loginmodule.svg" alt="Визуальный блок входа" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
          <div className="absolute inset-0 flex items-end p-10 text-white">
            <div>
              <p className="font-heading text-[56px] leading-none">Ваш визуал</p>
              <p className="mt-3 max-w-[420px] text-sm text-white/85">Замените изображение в /public/login-visual.jpg</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
