import { AuthGreeting } from "@/components/auth/auth-greeting";
import { ModeToggle } from "@/components/common/mode-toggle";
import { Button } from "@languist/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <AuthGreeting />
      <Button>Languist</Button>
      <ModeToggle />
    </main>
  );
}
