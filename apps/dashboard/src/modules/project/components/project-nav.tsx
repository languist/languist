'use client'

import type { SVGProps } from 'react'

import { buttonVariants } from '@languist/ui/button'
import { cn } from '@languist/ui/cn'
import { Tooltip, TooltipContent, TooltipTrigger } from '@languist/ui/tooltip'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type ProjectNavProps = {
  isCollapsed: boolean
  links: Array<{
    title: string
    href: string
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  }>
}

export function ProjectNav({ isCollapsed, links }: ProjectNavProps) {
  const pathname = usePathname()

  return (
    <div
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      data-collapsed={isCollapsed}
    >
      <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          const buttonVariant = isActive ? 'secondary' : 'ghost'

          if (isCollapsed) {
            return (
              <Tooltip key={link.title}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: buttonVariant, size: 'icon' }),
                    )}
                  >
                    <link.icon className="size-6" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="flex items-center gap-4"
                  side="right"
                >
                  {link.title}
                </TooltipContent>
              </Tooltip>
            )
          }

          return (
            <Link
              key={link.title}
              href={link.href}
              className={cn(
                buttonVariants({ variant: buttonVariant }),
                'justify-start',
              )}
            >
              <link.icon className="mr-2 size-6" />
              {link.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
