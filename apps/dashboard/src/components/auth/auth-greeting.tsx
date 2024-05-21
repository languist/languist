"use client";

import { useI18n } from "@/locales/client";

export function AuthGreeting() {
  const t = useI18n()

  return (
    <p>{t('description')}</p>
  )
}
