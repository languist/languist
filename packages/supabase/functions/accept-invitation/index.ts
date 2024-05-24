// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1"

import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { invitationId } = await req.json()

    const { data: userData } = await supabaseClient.auth.getUser()

    const { data: invitation } = await supabaseClient.from('organizations_invitations').select('*').eq('id', invitationId).eq('email', userData.user?.email).single().throwOnError()

    if (!invitation) {
      throw new Error('Invitation not found')
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // insert user into organization
    const { error } = await supabaseAdmin.from('organizations_members').insert({
      organization_id: invitation.organization_id,
      user_id: userData.user?.id,
      roles: [invitation.role],
    }).throwOnError()

    // delete invitation
    await supabaseClient.from('organizations_invitations').delete().eq('id', invitationId).throwOnError()

    // log activity
    await supabaseClient.from('activities').insert({
      organization_id: invitation.organization_id,
      user_id: userData.user?.id,
      action: 'joined',
      target_type: 'organization',
      target_id: invitation.organization_id,
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ data: 'ok' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
