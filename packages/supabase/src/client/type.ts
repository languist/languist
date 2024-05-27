import { SupabaseClient as SupabaseClientOG } from "@supabase/supabase-js";
import { Database } from "src/types";

export type SupabaseClient = SupabaseClientOG<Database>;
