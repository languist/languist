import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1"

import { corsHeaders } from '../_shared/cors.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

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

    const { emails, organizationId, role } = await req.json()

    const { data: userData } = await supabaseClient.auth.getUser()

    const { data: organization } = await supabaseClient.from('organizations').select('name').eq('id', organizationId).single().throwOnError()

    const { error } = await supabaseClient.from('organizations_invitations').insert(
      emails.map((email: string) => ({
        email,
        organization_id: organizationId,
        organization_name: organization?.name,
        role: role,
        created_by: userData.user?.id,
      }))
    ).throwOnError()

    if (error) {
      throw error
    }

    const result = await Promise.all(emails.map(async (email: string) => {
      return await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'khanh@languist.net',
          to: email,
          subject: `Invitation to join ${organization?.name} on Languist`,
          html: `
            <p>Hi there,</p>
            <p><strong>${userData.user?.email}</strong> has invited you to join the <strong>${organization?.name}</strong> team on <strong>Languist</strong>.</p>
            <p>Click <a href="https://languist.net/signup">here</a> to accept the invitation.</p>
          `
        }),
      })
    }))

    return new Response(JSON.stringify({ data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
