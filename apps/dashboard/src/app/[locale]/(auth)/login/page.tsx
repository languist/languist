import { LoginForm } from "@/modules/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login to Languist',
}

export default function Login() {
  return (
    <div className="flex w-full max-w-96 flex-col gap-4">
      <LoginForm />
    </div>
  )
}
