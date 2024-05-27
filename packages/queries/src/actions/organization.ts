'use server'

import { createServerClient } from "@languist/supabase/server-client";
import { CreateOrganizationVariables, createOrganization } from "@languist/supabase/organization"
import { revalidateTag } from "next/cache";

export async function createOrganizationAction(variables: CreateOrganizationVariables) {
  const supabase = await createServerClient()

  const result = await createOrganization({
    client: supabase,
    variables,
  })

  revalidateTag('organization')

  return result
}
