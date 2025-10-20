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
      class_coordinators: {
        Row: {
          created_at: string | null
          department: string
          email: string
          id: string
          name: string
          section: string
          user_id: string
          year: string
        }
        Insert: {
          created_at?: string | null
          department: string
          email: string
          id?: string
          name: string
          section: string
          user_id: string
          year: string
        }
        Update: {
          created_at?: string | null
          department?: string
          email?: string
          id?: string
          name?: string
          section?: string
          user_id?: string
          year?: string
        }
        Relationships: []
      }
      clubs_auth: {
        Row: {
          club_email: string
          club_name: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          club_email: string
          club_name: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          club_email?: string
          club_name?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      college_admins: {
        Row: {
          admin_email: string
          created_at: string | null
          id: string
          name: string | null
          user_id: string
        }
        Insert: {
          admin_email: string
          created_at?: string | null
          id?: string
          name?: string | null
          user_id: string
        }
        Update: {
          admin_email?: string
          created_at?: string | null
          id?: string
          name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      faculty: {
        Row: {
          created_at: string | null
          department: string
          email: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department: string
          email: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string
          email?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      hod: {
        Row: {
          created_at: string | null
          department: string
          email: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department: string
          email: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string
          email?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      od_applications: {
        Row: {
          class_name: string
          coordinator_approved_at: string | null
          coordinator_approved_by: string | null
          coordinator_comments: string | null
          coordinator_status:
            | Database["public"]["Enums"]["approval_status"]
            | null
          created_at: string | null
          department: string
          event_date: string
          event_name: string
          faculty_approved_at: string | null
          faculty_approved_by: string | null
          faculty_comments: string | null
          faculty_status: Database["public"]["Enums"]["approval_status"] | null
          hod_approved_at: string | null
          hod_approved_by: string | null
          hod_comments: string | null
          hod_status: Database["public"]["Enums"]["approval_status"] | null
          id: string
          od_details: string
          od_letter_url: string | null
          overall_status: Database["public"]["Enums"]["od_status"] | null
          registration_number: string
          section: string
          student_id: string
          student_name: string
          updated_at: string | null
          year: string
        }
        Insert: {
          class_name: string
          coordinator_approved_at?: string | null
          coordinator_approved_by?: string | null
          coordinator_comments?: string | null
          coordinator_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          created_at?: string | null
          department: string
          event_date: string
          event_name: string
          faculty_approved_at?: string | null
          faculty_approved_by?: string | null
          faculty_comments?: string | null
          faculty_status?: Database["public"]["Enums"]["approval_status"] | null
          hod_approved_at?: string | null
          hod_approved_by?: string | null
          hod_comments?: string | null
          hod_status?: Database["public"]["Enums"]["approval_status"] | null
          id?: string
          od_details: string
          od_letter_url?: string | null
          overall_status?: Database["public"]["Enums"]["od_status"] | null
          registration_number: string
          section: string
          student_id: string
          student_name: string
          updated_at?: string | null
          year: string
        }
        Update: {
          class_name?: string
          coordinator_approved_at?: string | null
          coordinator_approved_by?: string | null
          coordinator_comments?: string | null
          coordinator_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          created_at?: string | null
          department?: string
          event_date?: string
          event_name?: string
          faculty_approved_at?: string | null
          faculty_approved_by?: string | null
          faculty_comments?: string | null
          faculty_status?: Database["public"]["Enums"]["approval_status"] | null
          hod_approved_at?: string | null
          hod_approved_by?: string | null
          hod_comments?: string | null
          hod_status?: Database["public"]["Enums"]["approval_status"] | null
          id?: string
          od_details?: string
          od_letter_url?: string | null
          overall_status?: Database["public"]["Enums"]["od_status"] | null
          registration_number?: string
          section?: string
          student_id?: string
          student_name?: string
          updated_at?: string | null
          year?: string
        }
        Relationships: [
          {
            foreignKeyName: "od_applications_coordinator_approved_by_fkey"
            columns: ["coordinator_approved_by"]
            isOneToOne: false
            referencedRelation: "class_coordinators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "od_applications_faculty_approved_by_fkey"
            columns: ["faculty_approved_by"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "od_applications_hod_approved_by_fkey"
            columns: ["hod_approved_by"]
            isOneToOne: false
            referencedRelation: "hod"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "od_applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          department: string
          id: string
          name: string
          phone_number: string
          registration_number: string
          section: string
          user_id: string
          year: string
        }
        Insert: {
          created_at?: string | null
          department: string
          id?: string
          name: string
          phone_number: string
          registration_number: string
          section: string
          user_id: string
          year: string
        }
        Update: {
          created_at?: string | null
          department?: string
          id?: string
          name?: string
          phone_number?: string
          registration_number?: string
          section?: string
          user_id?: string
          year?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "student"
        | "club_admin"
        | "college_admin"
        | "faculty"
        | "hod"
        | "class_coordinator"
      approval_status: "pending" | "approved" | "rejected" | "needs_info"
      od_status: "pending" | "approved" | "rejected" | "needs_info"
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
      app_role: [
        "student",
        "club_admin",
        "college_admin",
        "faculty",
        "hod",
        "class_coordinator",
      ],
      approval_status: ["pending", "approved", "rejected", "needs_info"],
      od_status: ["pending", "approved", "rejected", "needs_info"],
    },
  },
} as const
