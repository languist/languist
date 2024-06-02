// import { logActivities } from "./activity";
import { SupabaseClient } from "./client/type";
import { Tables } from "./types";

export type File = Tables<'files'> & {
  phrase_count?: number
  user: Tables<'profiles'>
}

export async function getProjectFiles(client: SupabaseClient, projectId: string) {
  const { data, error } = await client
    .from('files')
    .select(`
      *,
      user: profiles (*)
    `)
    .eq('project_id', projectId)
    .throwOnError()

  if (error) {
    throw error
  }

  return data
}

export async function getFile(client: SupabaseClient, fileId: string) {
  const { data, error } = await client
    .from('files')
    .select(`
      *,
      user: profiles (*)
    `)
    .eq('id', fileId)
    .throwOnError()
    .single()

  if (error) {
    throw error
  }

  return data
}

export type UploadFilesValues = {
  project_id: string
  organization_id: string
  language: string
  files: any[]
}

export async function uploadFiles({
  client,
  values,
} : {
  client: SupabaseClient
  values: UploadFilesValues
}) {
  const formData = new FormData()
  formData.append('language', values.language)
  formData.append('project_id', values.project_id)
  formData.append('organization_id', values.organization_id)
  values.files.forEach((file) => {
    formData.append('files', file)
  })

  const { data, error } = await client.functions.invoke('upload-translation-file', {
    body: formData,
  })

  if (error) {
    throw error
  }
  
  // log activity
  // await logActivities([{
  //   organization_id: project.organization_id,
  //   user_id: project.user_id,
  //   action: 'created',
  //   target_type: 'project',
  //   target_id: data.id,
  //   extra: null,
  // }])

  return data
}

export type UpdateFileValues = Partial<File> & { id: string }

export async function updateFile({
  client,
  values: {
    id,
    ...file
  }
} : {
  client: SupabaseClient
  values: UpdateFileValues
}) {
  const { data, error } = await client
    .from('files')
    .update(file)
    .eq('id', id)
    .select(`
      *,
      user: profiles (*)
    `)
    .throwOnError()
    .single()

  if (error) {
    throw error
  }

  // log activity
  // await logActivities([{
  //   organization_id: data.organization_id,
  //   user_id: data.user_id,
  //   action: 'updated',
  //   target_type: 'file',
  //   target_id: data.id,
  //   extra: null,
  // }])

  return data
}

export async function deleteFile({
  client,
  fileId,
} : {
  client: SupabaseClient
  fileId: string
}) {
  const file = await getFile(client, fileId)

  if (!file) {
    throw new Error('File not found')
  }

  const { error } = await client
    .from('files')
    .delete()
    .eq('id', fileId)
    .throwOnError()

  if (error) {
    throw error
  }

  // log activity
  // await logActivities([{
  //   organization_id: file.organization_id,
  //   user_id: file.user_id,
  //   action: 'deleted',
  //   target_type: 'file',
  //   target_id: fileId,
  //   extra: null,
  // }])

  return file
}

export async function downloadFile({
  client,
  fileId,
} : {
  client: SupabaseClient
  fileId: string
}) {
  const { data, error } = await client.functions.invoke('download-translation-file', {
    body: {
      fileId,
    },
  })

  if (error) {
    throw error
  }

  if (!data?.result?.storage_path) {
    throw new Error('File not found')
  }

  const { data: blob } = await client.storage.from('files').download(data.result.storage_path)

  if (!blob) {
    throw new Error('File not found')
  }

  const url = window.URL.createObjectURL(
    new Blob([blob]),
  );
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    data.result.name,
  );

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode?.removeChild(link);

  return 'success'
}
