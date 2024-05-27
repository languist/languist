'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@languist/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@languist/ui/drawer'

import { useI18n } from '@/locales/client'
import { useMediaQuery } from '@/modules/common/hooks/use-media-query'

import { ProjectForm } from './project-form'

export function ProjectFormDialog({
  trigger,
  organizationId,
}: {
  trigger: ReactNode
  organizationId: string
}) {
  const t = useI18n()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('project.create.title')}</DialogTitle>
          </DialogHeader>
          <ProjectForm
            organizationId={organizationId}
            onCompleted={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer shouldScaleBackground open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{t('project.create.title')}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <ProjectForm
            organizationId={organizationId}
            onCompleted={() => setOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
