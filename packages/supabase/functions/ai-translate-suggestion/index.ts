import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1"
import OpenAI from "https://deno.land/x/openai@v4.33.1/mod.ts"

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

    const { organization_id, source_language, language, text } = await req.json()

    const { data: organization } = await supabaseClient
      .from('organizations')
      .select('openai_api_key')
      .eq('id', organization_id)
      .single()

    if (!organization?.openai_api_key) {
      throw new Error('Organization does not have OpenAI API key')
    }

    const openai = new OpenAI({
      apiKey: organization.openai_api_key,
    })

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Translate the following text from ${source_language} to ${language}:`,
        },
        {
          role: 'user',
          content: text,
        },
      ]
    })

    const suggestion = response.choices?.[0]?.message?.content
  
    return new Response(JSON.stringify({
      success: true,
      suggestion,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
