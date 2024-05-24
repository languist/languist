// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1"
import { multiParser, FormFile } from 'https://deno.land/x/multiparser@0.114.0/mod.ts'
import gettextParser from 'npm:gettext-parser@8.0.0'
import utf8 from 'npm:utf8@3.0.0'

import { corsHeaders } from '../_shared/cors.ts'

// Decode a string to UTF-8
function decodeUtf8(text: string) {
  return utf8.decode(text)
}

function parsePoFile(content: ArrayBuffer) {
  const raw = gettextParser.po.parse(content)
  const phrases = Object.entries(raw.translations[""]).map(([key, value]: any) => ({
    key,
    text: decodeUtf8(value.msgid),
    value: decodeUtf8(value.msgstr[0]),
    language: raw.headers['Language'],
    context: value.comments?.reference,
    has_plurals: value.msgid_plural ? true : false,
  }))
  const parsed = {
    language: raw.headers['Language'],
    phrases,
  }
  return parsed
}

// parse json file to phrases. support multi-level nested objects
function parseJsonFile(content: ArrayBuffer) {
  const text = new TextDecoder().decode(content)
  const json = JSON.parse(text)

  function traverse(obj: any, path: string[] = []): any[] {
    return Object.entries(obj).reduce((acc: any, [key, value]) => {
      if (typeof value === 'object') {
        return [...acc, ...traverse(value, [...path, key])]
      }
      return [...acc, {
        key: [...path, key].join('.'),
        text: value,
      }]
    }, [])
  }

  const phrases = traverse(json)

  return {
    phrases,
  }
}

const supportedFileTypes = ['.po', '.json']

// function typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
//   return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
// }

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

    const form = await multiParser(req);
    if (!form) {
      throw new Error('No form data found')
    }

    const language = form.fields.language ?? 'en'
    const project_id = form.fields.project_id
    const organization_id = form.fields.organization_id
    const ff = form.files?.files

    const files = (ff ? ((ff as any)?.length ? ff : [ff]) : []) as FormFile[]

    if (!files?.length || !project_id || !organization_id || !language) {
      console.log('upload error', {
        form,
        language,
        project_id,
        organization_id,
        files,
      })
  
      throw new Error('Missing required fields')
    }

    // Parse data and upload files
    const uploadResult = await Promise.all(files.map(async (file) => {
      if (!file.content) {
        throw new Error('No file content found')
      }

      if (!supportedFileTypes.some((ext) => file.filename.endsWith(ext))) {
        throw new Error('Unsupported file type')
      }

      let parsedData

      // process translation file
      if (file.filename.endsWith('.po')) {
        parsedData = parsePoFile(file.content)
      } else if (file.filename.endsWith('.json')) {
        parsedData = parseJsonFile(file.content)
      }

      const storagePath = `${organization_id}/${project_id}/${language}/${file.filename}`

      // upload file to storage
      const { data: uploadData, error } = await supabaseClient
        .storage
        .from('files')
        .upload(
          storagePath,
          file.content.buffer,
          {
            contentType: file.contentType,
            cacheControl: '3600',
            upsert: true
          }
        )

      if (error) {
        throw error
      }

      return {
        filename: file.filename,
        ...uploadData,
        parsedData,
      }
    }))

    // console.log('uploadResult', uploadResult)

    // Save files & phrases to database
    await Promise.all(uploadResult.map(async (item) => {
      // find and delete existing file
      const { data: existingFile } = await supabaseClient
        .from('files')
        .select('id')
        .eq('storage_path', item.path)
        .limit(1)
        .single()
      // this should also delete all phrases associated with the file
      if (existingFile?.id) {
        await supabaseClient
          .from('files')
          .delete()
          .eq('id', existingFile.id)
      }

      // save new file
      const savedFile = await supabaseClient
        .from('files')
        .insert({
          name: item.filename,
          organization_id,
          project_id,
          language,
          storage_path: item.path,
          user_id: userData.user?.id
        })
        .limit(1)
        .select('id')
        .single()
        .throwOnError()

      const { data: projectData } = await supabaseClient
        .from('projects')
        .select('source_language')
        .eq('id', project_id)
        .limit(1)
        .single()

      const sourceLanguage = projectData?.source_language

      if (item.parsedData && savedFile.data && sourceLanguage) {
        if (sourceLanguage === language) {
          // save phrases
          await supabaseClient
            .from('phrases')
            .insert(item.parsedData.phrases.map((phrase) => ({
              file_id: savedFile.data.id,
              project_id,
              organization_id,
              language,
              user_id: userData.user?.id,
              key: phrase.key,
              text: phrase.text,
              context: phrase.context,
            })))
          .throwOnError()
        } else {
          // find phrase_id by key + context and save translation
          const existingTranslations = existingFile?.id
            ? (await supabaseClient
                .from('translations')
                .select('id, context, key, value')
                .eq('file_id', existingFile.id)
                .neq('value', '')
                .neq('value', null))?.data ?? []
            : []

          await Promise.all(item.parsedData.phrases.map(async (phrase) => {
            const { data: phraseData } = await supabaseClient
              .from('phrases')
              .select('id')
              .eq('key', phrase.key)
              .eq('context', phrase.context)
              .eq('language', sourceLanguage)
              .eq('project_id', project_id)
              .eq('organization_id', organization_id)
              .limit(1)
              .single()

            if (phraseData?.id) {
              const existingTranslation = existingTranslations.find((t) => t.key === phrase.key && t.context === phrase.context)
              await supabaseClient
                .from('translations')
                .insert({
                  phrase_id: phraseData.id,
                  language,
                  key: phrase.key,
                  text: phrase.text,
                  context: phrase.context,
                  value: phrase.value || existingTranslation?.value || '',
                  user_id: userData.user?.id,
                  organization_id,
                  project_id,
                  file_id: savedFile.data.id,
                })
                .throwOnError()
            }
          }))
        }
      }

      // log activity
      await supabaseClient
        .from('activities')
        .insert({
          organization_id,
          user_id: userData.user?.id,
          action: 'uploaded',
          target_type: 'file',
          target_id: savedFile.data?.id,
          extra: item.filename,
        })
        .throwOnError()
    }))

    return new Response(JSON.stringify({
      success: true,
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
