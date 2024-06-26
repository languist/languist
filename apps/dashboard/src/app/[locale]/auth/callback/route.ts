import { NextResponse } from 'next/server'

import { createClient } from '@/modules/common/supabase-server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    process.env.NEXT_PUBLIC_ORIGIN_URL || requestUrl.origin,
  )
}
