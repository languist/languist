import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative grid place-items-center overflow-hidden p-4 pt-24">
      <div className="bg-auth-pattern absolute -top-24 mx-auto h-[800px] w-[800px] bg-no-repeat" />
      <div className="relative flex flex-col gap-4 md:gap-8">{children}</div>
    </div>
  )
}
