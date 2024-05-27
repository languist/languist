'use server'

import { getCachedOrganizations } from '@languist/queries'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const organizations = await getCachedOrganizations()

  if (!organizations?.length) {
    redirect('/getting-started')
  }

  const workspace = getCookie('workspace', { cookies })

  redirect(`/${workspace || organizations[0]?.slug}`)
}
