export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          after_state: Json | null
          before_state: Json | null
          created_at: string | null
          id: string
          ip_address: string | null
          object_id: string | null
          object_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          after_state?: Json | null
          before_state?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          object_id?: string | null
          object_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          after_state?: Json | null
          before_state?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          object_id?: string | null
          object_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          canonical_url: string | null
          category: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          featured_image: string | null
          id: string
          preview_token: string | null
          publish_state: Database["public"]["Enums"]["publish_state"] | null
          published_at: string | null
          read_time_minutes: number | null
          scheduled_publish: string | null
          scheduled_publish_at: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          author_id?: string | null
          canonical_url?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          featured_image?: string | null
          id?: string
          preview_token?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          published_at?: string | null
          read_time_minutes?: number | null
          scheduled_publish?: string | null
          scheduled_publish_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          author_id?: string | null
          canonical_url?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          featured_image?: string | null
          id?: string
          preview_token?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          published_at?: string | null
          read_time_minutes?: number | null
          scheduled_publish?: string | null
          scheduled_publish_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          submission_type: string | null
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          submission_type?: string | null
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          submission_type?: string | null
        }
        Relationships: []
      }
      job_postings: {
        Row: {
          closing_date: string | null
          created_at: string | null
          created_by: string | null
          department: string | null
          employment_type: Database["public"]["Enums"]["employment_type"] | null
          id: string
          location: string | null
          publish_state: Database["public"]["Enums"]["publish_state"] | null
          qualifications: string | null
          responsibilities: string | null
          salary_range: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          closing_date?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          id?: string
          location?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          qualifications?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          closing_date?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          id?: string
          location?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          qualifications?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_postings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content_blocks: Json | null
          created_at: string | null
          created_by: string | null
          id: string
          preview_token: string | null
          publish_state: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          content_blocks?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          preview_token?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          content_blocks?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          preview_token?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_services: {
        Row: {
          id: string
          project_id: string | null
          service_id: string | null
        }
        Insert: {
          id?: string
          project_id?: string | null
          service_id?: string | null
        }
        Update: {
          id?: string
          project_id?: string | null
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_services_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget_range: string | null
          category: string | null
          client_name: string | null
          completion_date: string | null
          content_blocks: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          draft_content: Json | null
          featured_image: string | null
          gallery: Json | null
          id: string
          location: string | null
          preview_token: string | null
          process_notes: string | null
          project_size: string | null
          project_status: string | null
          publish_state: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          start_date: string | null
          subtitle: string | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          updated_by: string | null
          version: number | null
        }
        Insert: {
          budget_range?: string | null
          category?: string | null
          client_name?: string | null
          completion_date?: string | null
          content_blocks?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          draft_content?: Json | null
          featured_image?: string | null
          gallery?: Json | null
          id?: string
          location?: string | null
          preview_token?: string | null
          process_notes?: string | null
          project_size?: string | null
          project_status?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          start_date?: string | null
          subtitle?: string | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          version?: number | null
        }
        Update: {
          budget_range?: string | null
          category?: string | null
          client_name?: string | null
          completion_date?: string | null
          content_blocks?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          draft_content?: Json | null
          featured_image?: string | null
          gallery?: Json | null
          id?: string
          location?: string | null
          preview_token?: string | null
          process_notes?: string | null
          project_size?: string | null
          project_status?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          start_date?: string | null
          subtitle?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          request_count: number | null
          user_identifier: string
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          request_count?: number | null
          user_identifier: string
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          request_count?: number | null
          user_identifier?: string
          window_start?: string | null
        }
        Relationships: []
      }
      resume_submissions: {
        Row: {
          admin_notes: string | null
          applicant_name: string
          cover_message: string | null
          created_at: string | null
          email: string
          id: string
          job_id: string | null
          phone: string | null
          portfolio_links: string[] | null
          resume_url: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          applicant_name: string
          cover_message?: string | null
          created_at?: string | null
          email: string
          id?: string
          job_id?: string | null
          phone?: string | null
          portfolio_links?: string[] | null
          resume_url?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          applicant_name?: string
          cover_message?: string | null
          created_at?: string | null
          email?: string
          id?: string
          job_id?: string | null
          phone?: string | null
          portfolio_links?: string[] | null
          resume_url?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_submissions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          created_by: string | null
          estimated_timeline: string | null
          featured_image: string | null
          icon_name: string | null
          id: string
          long_description: string | null
          name: string
          preview_token: string | null
          pricing_range_max: number | null
          pricing_range_min: number | null
          publish_state: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at: string | null
          scope_template: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          short_description: string | null
          slug: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          estimated_timeline?: string | null
          featured_image?: string | null
          icon_name?: string | null
          id?: string
          long_description?: string | null
          name: string
          preview_token?: string | null
          pricing_range_max?: number | null
          pricing_range_min?: number | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at?: string | null
          scope_template?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          estimated_timeline?: string | null
          featured_image?: string | null
          icon_name?: string | null
          id?: string
          long_description?: string | null
          name?: string
          preview_token?: string | null
          pricing_range_max?: number | null
          pricing_range_min?: number | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          scheduled_publish_at?: string | null
          scope_template?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_comments: {
        Row: {
          comment: string
          created_at: string | null
          id: string
          task_id: string | null
          user_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: string
          task_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: string
          task_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          dependencies: Json | null
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          gantt_position: number | null
          id: string
          is_milestone: boolean | null
          priority: string | null
          project_id: string | null
          start_date: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          dependencies?: Json | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          gantt_position?: number | null
          id?: string
          is_milestone?: boolean | null
          priority?: string | null
          project_id?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          dependencies?: Json | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          gantt_position?: number | null
          id?: string
          is_milestone?: boolean | null
          priority?: string | null
          project_id?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
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
      can_edit_content: {
        Args: { _user_id: string }
        Returns: boolean
      }
      cleanup_rate_limits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "editor" | "contributor" | "viewer"
      application_status:
        | "new"
        | "reviewed"
        | "contacted"
        | "rejected"
        | "hired"
      employment_type: "full_time" | "part_time" | "contract" | "internship"
      publish_state: "draft" | "scheduled" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "editor", "contributor", "viewer"],
      application_status: ["new", "reviewed", "contacted", "rejected", "hired"],
      employment_type: ["full_time", "part_time", "contract", "internship"],
      publish_state: ["draft", "scheduled", "published", "archived"],
    },
  },
} as const
