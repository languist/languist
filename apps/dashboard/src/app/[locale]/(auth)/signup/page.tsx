import { SignUpForm } from "@/modules/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create an account',
}

export default function SignUp() {
  return (
    <div className="flex w-full max-w-96 flex-col gap-4">
      <SignUpForm />
    </div>
  );
}
