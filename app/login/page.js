import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginPage from "../components/LoginPage/LoginPage";

export default async function LoginRoutePage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <LoginPage />;
}
