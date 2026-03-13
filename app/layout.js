import "./globals.css";
import { ThemeProvider } from "./components/Theme/ThemeProvider";
import ThemeToggle from "./components/Theme/ThemeToggle";
import AuthProvider from "./components/Auth/AuthProvider";
import { auth } from "@/auth";

export const metadata = {
  title: "Интернет-магазин",
  description: "Современный магазин одежды и аксессуаров",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider session={session}>
          <ThemeProvider>
            <ThemeToggle />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
