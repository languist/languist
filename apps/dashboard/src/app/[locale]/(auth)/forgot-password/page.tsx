import { ForgotPasswordForm } from "@/modules/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Password recovery',
}

export default function ForgotPassword() {
  return (
    <div className="flex w-full max-w-96 flex-col gap-4">
      <ForgotPasswordForm />
    </div>
  )
}
