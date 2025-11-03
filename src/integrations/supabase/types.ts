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
      survey_responses: {
        Row: {
          age: number | null
          ai_interactions_per_day: string | null
          avg_daily_internet_hours: number | null
          calculated_ai_co2: number | null
          calculated_devices_co2: number | null
          calculated_streaming_co2: number | null
          calculated_total_co2: number | null
          city_tier: string | null
          cloud_services_usage_hours: string | null
          created_at: string
          current_accommodation: string | null
          devices: Json | null
          energy_efficient_appliances: string | null
          estimated_annual_footprint: string | null
          family_income_range: string | null
          gender: string | null
          has_solar_panels: string | null
          home_city: string | null
          home_schooling: string | null
          home_state: string | null
          id: string
          occupation: string | null
          primary_charging_habits: string | null
          primary_internet_connection: string | null
          primary_power_source: string | null
          quiz_ai_usage_impact: number | null
          quiz_charging_habits_impact: number | null
          quiz_data_usage_impact: number | null
          quiz_device_lifespan_impact: number | null
          quiz_renewable_energy_impact: number | null
          quiz_streaming_gaming_impact: number | null
          raw_data: Json | null
          renewable_electricity_access: string | null
          renewable_energy_usage: string | null
          research_consent: boolean | null
          streaming_academic_hours: string | null
          streaming_entertainment_hours: string | null
          total_devices_owned: number | null
          type_of_ai_usage: string | null
          typical_ai_session_length: string | null
          uploads_per_month_gb: string | null
        }
        Insert: {
          age?: number | null
          ai_interactions_per_day?: string | null
          avg_daily_internet_hours?: number | null
          calculated_ai_co2?: number | null
          calculated_devices_co2?: number | null
          calculated_streaming_co2?: number | null
          calculated_total_co2?: number | null
          city_tier?: string | null
          cloud_services_usage_hours?: string | null
          created_at?: string
          current_accommodation?: string | null
          devices?: Json | null
          energy_efficient_appliances?: string | null
          estimated_annual_footprint?: string | null
          family_income_range?: string | null
          gender?: string | null
          has_solar_panels?: string | null
          home_city?: string | null
          home_schooling?: string | null
          home_state?: string | null
          id?: string
          occupation?: string | null
          primary_charging_habits?: string | null
          primary_internet_connection?: string | null
          primary_power_source?: string | null
          quiz_ai_usage_impact?: number | null
          quiz_charging_habits_impact?: number | null
          quiz_data_usage_impact?: number | null
          quiz_device_lifespan_impact?: number | null
          quiz_renewable_energy_impact?: number | null
          quiz_streaming_gaming_impact?: number | null
          raw_data?: Json | null
          renewable_electricity_access?: string | null
          renewable_energy_usage?: string | null
          research_consent?: boolean | null
          streaming_academic_hours?: string | null
          streaming_entertainment_hours?: string | null
          total_devices_owned?: number | null
          type_of_ai_usage?: string | null
          typical_ai_session_length?: string | null
          uploads_per_month_gb?: string | null
        }
        Update: {
          age?: number | null
          ai_interactions_per_day?: string | null
          avg_daily_internet_hours?: number | null
          calculated_ai_co2?: number | null
          calculated_devices_co2?: number | null
          calculated_streaming_co2?: number | null
          calculated_total_co2?: number | null
          city_tier?: string | null
          cloud_services_usage_hours?: string | null
          created_at?: string
          current_accommodation?: string | null
          devices?: Json | null
          energy_efficient_appliances?: string | null
          estimated_annual_footprint?: string | null
          family_income_range?: string | null
          gender?: string | null
          has_solar_panels?: string | null
          home_city?: string | null
          home_schooling?: string | null
          home_state?: string | null
          id?: string
          occupation?: string | null
          primary_charging_habits?: string | null
          primary_internet_connection?: string | null
          primary_power_source?: string | null
          quiz_ai_usage_impact?: number | null
          quiz_charging_habits_impact?: number | null
          quiz_data_usage_impact?: number | null
          quiz_device_lifespan_impact?: number | null
          quiz_renewable_energy_impact?: number | null
          quiz_streaming_gaming_impact?: number | null
          raw_data?: Json | null
          renewable_electricity_access?: string | null
          renewable_energy_usage?: string | null
          research_consent?: boolean | null
          streaming_academic_hours?: string | null
          streaming_entertainment_hours?: string | null
          total_devices_owned?: number | null
          type_of_ai_usage?: string | null
          typical_ai_session_length?: string | null
          uploads_per_month_gb?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      survey_statistics: {
        Row: {
          avg_age: number | null
          avg_carbon_footprint: number | null
          avg_devices: number | null
          states_represented: number | null
          total_responses: number | null
          unique_occupations: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
