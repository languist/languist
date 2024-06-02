export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access_tokens: {
        Row: {
          created_at: string
          id: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          token: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_access_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      activities: {
        Row: {
          action: string
          created_at: string
          extra: string | null
          id: string
          organization_id: string
          target_id: string | null
          target_type: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          extra?: string | null
          id?: string
          organization_id: string
          target_id?: string | null
          target_type?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          extra?: string | null
          id?: string
          organization_id?: string
          target_id?: string | null
          target_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_activities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string
          export_pattern: string | null
          id: string
          language: string | null
          local_path: string | null
          name: string
          organization_id: string
          project_id: string
          storage_path: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          export_pattern?: string | null
          id?: string
          language?: string | null
          local_path?: string | null
          name: string
          organization_id: string
          project_id?: string
          storage_path: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          export_pattern?: string | null
          id?: string
          language?: string | null
          local_path?: string | null
          name?: string
          organization_id?: string
          project_id?: string
          storage_path?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_files_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_files_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          logo: string | null
          name: string | null
          openai_api_key: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo?: string | null
          name?: string | null
          openai_api_key?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo?: string | null
          name?: string | null
          openai_api_key?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      organizations_invitations: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          id: string
          organization_id: string
          organization_name: string | null
          role: string
          status: Database["public"]["Enums"]["org_invitation_status"]
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          organization_id?: string
          organization_name?: string | null
          role: string
          status?: Database["public"]["Enums"]["org_invitation_status"]
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          organization_id?: string
          organization_name?: string | null
          role?: string
          status?: Database["public"]["Enums"]["org_invitation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "public_organizations_invitations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_organizations_invitations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          roles: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          roles?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          roles?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_organizations_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_organizations_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      phrases: {
        Row: {
          context: string | null
          created_at: string
          file_id: string
          has_plurals: boolean | null
          id: string
          key: string
          language: string
          organization_id: string
          project_id: string
          text: string
          user_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          file_id?: string
          has_plurals?: boolean | null
          id?: string
          key: string
          language?: string
          organization_id?: string
          project_id?: string
          text: string
          user_id: string
        }
        Update: {
          context?: string | null
          created_at?: string
          file_id?: string
          has_plurals?: boolean | null
          id?: string
          key?: string
          language?: string
          organization_id?: string
          project_id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_phrases_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_phrases_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_phrases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_phrases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          about: string | null
          avatar_url: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          id: string
          name: string
          organization_id: string
          source_language: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          organization_id?: string
          source_language?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          organization_id?: string
          source_language?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          context: string | null
          created_at: string
          file_id: string | null
          id: string
          key: string | null
          language: string
          organization_id: string
          phrase_id: string
          project_id: string
          text: string | null
          user_id: string
          value: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string
          file_id?: string | null
          id?: string
          key?: string | null
          language: string
          organization_id?: string
          phrase_id?: string
          project_id?: string
          text?: string | null
          user_id?: string
          value?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string
          file_id?: string | null
          id?: string
          key?: string | null
          language?: string
          organization_id?: string
          phrase_id?: string
          project_id?: string
          text?: string | null
          user_id?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_translations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_translations_phrase_id_fkey"
            columns: ["phrase_id"]
            isOneToOne: false
            referencedRelation: "phrases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_translations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_translations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_organization_languages: {
        Args: {
          organization_id: string
        }
        Returns: {
          language: string
          project_id: string
          file_count: number
          phrase_count: number
          translated_count: number
        }[]
      }
      get_organization_projects: {
        Args: {
          organization_id: string
        }
        Returns: string[]
      }
      get_organizations: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
          logo: string
          slug: string
          created_at: string
          last_translated_at: string
          languages: string[]
          file_count: number
          phrase_count: number
          translated_count: number
        }[]
      }
      get_organizations_for_user: {
        Args: {
          user_id: string
        }
        Returns: string[]
      }
      get_project_languages: {
        Args: {
          project_id: string
        }
        Returns: {
          language: string
          file_count: number
          phrase_count: number
          translated_count: number
        }[]
      }
    }
    Enums: {
      org_invitation_status: "PENDING" | "ACCEPTED" | "REJECTED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
