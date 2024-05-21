import type { ReactNode } from "react";
import { Providers } from "./providers";

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default function Layout({
  children,
  params: { locale },
} : LayoutProps) {
  return <Providers locale={locale}>{children}</Providers>;
}
