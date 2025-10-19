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
      analytics_snapshots: {
        Row: {
          avg_time_on_page: number | null
          bounce_rate: number | null
          created_at: string | null
          id: string
          page_path: string
          page_views: number | null
          snapshot_date: string
          unique_visitors: number | null
        }
        Insert: {
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          id?: string
          page_path: string
          page_views?: number | null
          snapshot_date: string
          unique_visitors?: number | null
        }
        Update: {
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          id?: string
          page_path?: string
          page_views?: number | null
          snapshot_date?: string
          unique_visitors?: number | null
        }
        Relationships: []
      }
      approval_workflows: {
        Row: {
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          review_notes: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: string | null
          submitted_by: string
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string | null
          submitted_by: string
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string | null
          submitted_by?: string
        }
        Relationships: []
      }
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
      auth_account_lockouts: {
        Row: {
          created_at: string | null
          id: string
          locked_at: string | null
          locked_until: string
          reason: string | null
          unlocked_at: string | null
          unlocked_by: string | null
          user_identifier: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          locked_at?: string | null
          locked_until: string
          reason?: string | null
          unlocked_at?: string | null
          unlocked_by?: string | null
          user_identifier: string
        }
        Update: {
          created_at?: string | null
          id?: string
          locked_at?: string | null
          locked_until?: string
          reason?: string | null
          unlocked_at?: string | null
          unlocked_by?: string | null
          user_identifier?: string
        }
        Relationships: []
      }
      auth_failed_attempts: {
        Row: {
          attempt_time: string | null
          created_at: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_identifier: string
        }
        Insert: {
          attempt_time?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_identifier: string
        }
        Update: {
          attempt_time?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_identifier?: string
        }
        Relationships: []
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
      content_comments: {
        Row: {
          block_id: string | null
          content: string
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          parent_id: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          block_id?: string | null
          content: string
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          parent_id?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          block_id?: string | null
          content?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          parent_id?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "content_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      content_versions: {
        Row: {
          change_summary: string | null
          changed_by: string
          content_snapshot: Json
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          version_number: number
        }
        Insert: {
          change_summary?: string | null
          changed_by: string
          content_snapshot: Json
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          version_number: number
        }
        Update: {
          change_summary?: string | null
          changed_by?: string
          content_snapshot?: Json
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          version_number?: number
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_image: string | null
          badge_text: string | null
          created_at: string | null
          created_by: string | null
          headline: string
          id: string
          is_active: boolean | null
          primary_cta_text: string
          primary_cta_url: string
          secondary_cta_text: string | null
          secondary_cta_url: string | null
          subheadline: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          background_image?: string | null
          badge_text?: string | null
          created_at?: string | null
          created_by?: string | null
          headline: string
          id?: string
          is_active?: boolean | null
          primary_cta_text: string
          primary_cta_url: string
          secondary_cta_text?: string | null
          secondary_cta_url?: string | null
          subheadline: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          background_image?: string | null
          badge_text?: string | null
          created_at?: string | null
          created_by?: string | null
          headline?: string
          id?: string
          is_active?: boolean | null
          primary_cta_text?: string
          primary_cta_url?: string
          secondary_cta_text?: string | null
          secondary_cta_url?: string | null
          subheadline?: string
          updated_at?: string | null
          updated_by?: string | null
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
      navigation_menus: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          items: Json
          location: string
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          items: Json
          location: string
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          items?: Json
          location?: string
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          link: string | null
          message: string
          metadata: Json | null
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link?: string | null
          message: string
          metadata?: Json | null
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link?: string | null
          message?: string
          metadata?: Json | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      optimization_recommendations: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          priority: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          priority?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          priority?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
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
      performance_metrics: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_type: string
          recorded_at: string | null
          unit: string | null
          value: number
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_type: string
          recorded_at?: string | null
          unit?: string | null
          value: number
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_type?: string
          recorded_at?: string | null
          unit?: string | null
          value?: number
        }
        Relationships: []
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
          duration: string | null
          featured: boolean | null
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
          year: string | null
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
          duration?: string | null
          featured?: boolean | null
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
          year?: string | null
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
          duration?: string | null
          featured?: boolean | null
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
          year?: string | null
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
      security_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          user_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          user_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          user_id?: string | null
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          canonical_url: string | null
          created_at: string | null
          entity_id: string
          entity_type: string
          focus_keyword: string | null
          id: string
          last_analyzed_at: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          permalink: string | null
          robots_meta: string | null
          seo_score: number | null
          updated_at: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          focus_keyword?: string | null
          id?: string
          last_analyzed_at?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          permalink?: string | null
          robots_meta?: string | null
          seo_score?: number | null
          updated_at?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          focus_keyword?: string | null
          id?: string
          last_analyzed_at?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          permalink?: string | null
          robots_meta?: string | null
          seo_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
      site_settings: {
        Row: {
          address: string | null
          business_hours: Json | null
          certifications: string[] | null
          company_name: string
          created_at: string | null
          email: string
          google_analytics_id: string | null
          id: string
          is_active: boolean | null
          meta_description: string | null
          meta_title: string | null
          og_image: string | null
          phone: string
          social_links: Json | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: Json | null
          certifications?: string[] | null
          company_name?: string
          created_at?: string | null
          email: string
          google_analytics_id?: string | null
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          phone: string
          social_links?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: Json | null
          certifications?: string[] | null
          company_name?: string
          created_at?: string | null
          email?: string
          google_analytics_id?: string | null
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          phone?: string
          social_links?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      sitemap_logs: {
        Row: {
          error_message: string | null
          generated_at: string | null
          id: string
          status: string | null
          url_count: number | null
        }
        Insert: {
          error_message?: string | null
          generated_at?: string | null
          id?: string
          status?: string | null
          url_count?: number | null
        }
        Update: {
          error_message?: string | null
          generated_at?: string | null
          id?: string
          status?: string | null
          url_count?: number | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          label: string
          suffix: string | null
          updated_at: string | null
          updated_by: string | null
          value: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          suffix?: string | null
          updated_at?: string | null
          updated_by?: string | null
          value: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          suffix?: string | null
          updated_at?: string | null
          updated_by?: string | null
          value?: number
        }
        Relationships: []
      }
      style_presets: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          values: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          values: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          values?: Json
        }
        Relationships: []
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
      templates: {
        Row: {
          content: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          thumbnail: string | null
          type: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          thumbnail?: string | null
          type: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          thumbnail?: string | null
          type?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          author_position: string | null
          company_name: string | null
          created_at: string | null
          created_by: string | null
          date_published: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          project_name: string | null
          publish_state: Database["public"]["Enums"]["publish_state"] | null
          quote: string
          rating: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          author_name: string
          author_position?: string | null
          company_name?: string | null
          created_at?: string | null
          created_by?: string | null
          date_published?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          project_name?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          quote: string
          rating?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          author_name?: string
          author_position?: string | null
          company_name?: string | null
          created_at?: string | null
          created_by?: string | null
          date_published?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          project_name?: string | null
          publish_state?: Database["public"]["Enums"]["publish_state"] | null
          quote?: string
          rating?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
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
      user_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: string | null
          last_activity: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
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
      check_and_update_rate_limit: {
        Args: {
          p_endpoint: string
          p_identifier: string
          p_limit?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      cleanup_expired_lockouts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_failed_attempts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_rate_limits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_notification: {
        Args: {
          p_link?: string
          p_message: string
          p_metadata?: Json
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      get_security_audit_log: {
        Args: { limit_count?: number }
        Returns: {
          accessed_by_email: string
          accessed_email: string
          action: string
          created_at: string
          id: string
          ip_address: string
          object_id: string
          object_type: string
          user_agent: string
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_account_locked: {
        Args: { p_user_identifier: string }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      save_content_version: {
        Args: {
          p_change_summary: string
          p_content_snapshot: Json
          p_entity_id: string
          p_entity_type: string
        }
        Returns: undefined
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
