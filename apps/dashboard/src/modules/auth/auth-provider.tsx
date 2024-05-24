'use client'

import React from 'react'

import { AuthProvider as BaseAuthProvider } from '@languist/auth'
import { createAuthService } from '@languist/supabase/auth'
import { supabaseClient } from '@languist/supabase/client'

const authService = createAuthService(supabaseClient)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  return <BaseAuthProvider {...authService} {...props} />
}
