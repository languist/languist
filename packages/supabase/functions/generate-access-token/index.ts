import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1"
import { accessToken } from "https://deno.land/x/access_token@1.0.0/mod.ts"

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

    const { data: userData } = await supabaseClient.auth.getUser()

    if (!userData?.user) {
      throw new Error('User not found')
    }

    const newToken = accessToken.generate("lgt", Deno.env.get('SECRET_TOKEN') + userData.user.id)

    const { data: result } = await supabaseClient.from('access_tokens').insert({
      user_id: userData.user.id,
      token: newToken,
    }).select('*').throwOnError()

    return new Response(JSON.stringify({data: result}), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
