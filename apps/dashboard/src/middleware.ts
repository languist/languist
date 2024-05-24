import { createClient } from '@languist/supabase/middleware'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'

import {
  stackMiddlewares,
  type MiddlewareFactory,
} from './modules/common/middleware-factory'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
})

const withI18n: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    await next(request, _next)
    return I18nMiddleware(request)
  }
}

const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { supabase } = await createClient(request)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user && !request.nextUrl.pathname.includes('/auth/')) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (user && request.nextUrl.pathname.includes('/auth/')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return next(request, _next)
  }
}

export default stackMiddlewares([withAuth, withI18n])

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
