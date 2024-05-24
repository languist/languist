// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1"
import gettextParser from 'npm:gettext-parser@8.0.0'

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

    const { fileId } = await req.json()

    if (!fileId) {
      throw new Error('No file ID found')
    }

    const { data: fileData } = await supabaseClient
      .from('files')
      .select('*')
      .eq('id', fileId)
      .limit(1)
      .single()
      .throwOnError()

    if (!fileData?.id) {
      throw new Error('File not found')
    }

    // get file from storage
    const { data: file } = await supabaseClient.storage.from('files').download(fileData.storage_path)

    const arrayBuffer = await file?.arrayBuffer()

    if (!arrayBuffer) {
      throw new Error('File data not found')
    }

    const buffer = new Uint8Array(arrayBuffer)

    const raw = gettextParser.po.parse(buffer)

    const { data: translationsData } = await supabaseClient
      .from('translations')
      .select('*')
      .neq('value', '')
      .neq('value', null)
      .eq('file_id', fileId)
      .throwOnError()

    const combined = {
      ...raw,
      translations: {
        "": Object.entries(raw.translations[""]).reduce((acc: any, [key, value]: any) => ({
          ...acc,
          [key]: {
            ...value,
            msgstr: [translationsData?.find((t: any) => t.key === key)?.value || value.msgstr[0] || ''],
          },
        }), {}),
      }
    }

    combined.charset = 'utf-8'

    const po = gettextParser.po.compile(combined)

    const tmpStoragePath = `${fileData.organization_id}/${fileData.project_id}/${fileData.language}/downloads/${fileData.name}`

    // upload file to storage
    await supabaseClient.storage.from('files').upload(tmpStoragePath, po, {
      upsert: true,
    })

    return new Response(JSON.stringify({
      success: true,
      result: {
        ...fileData,
        storage_path: tmpStoragePath,
      },
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
