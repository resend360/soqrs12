export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          phone: string
          email: string | null
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          social_links: Json | null
          is_premium: boolean
          premium_until: string | null
          push_token: string | null
          location_permission: boolean
          language: string
          notification_settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          phone: string
          email?: string | null
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          social_links?: Json | null
          is_premium?: boolean
          premium_until?: string | null
          push_token?: string | null
          location_permission?: boolean
          language?: string
          notification_settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string
          email?: string | null
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          social_links?: Json | null
          is_premium?: boolean
          premium_until?: string | null
          push_token?: string | null
          location_permission?: boolean
          language?: string
          notification_settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      // Add other tables as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
