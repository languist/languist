import { SupabaseClient as SupabaseClientOG } from "@supabase/supabase-js";
import { Database } from "../types";

export type SupabaseClient = SupabaseClientOG<Database>;
