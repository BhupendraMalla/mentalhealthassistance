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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          type: 'patient' | 'counselor'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          type: 'patient' | 'counselor'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          type?: 'patient' | 'counselor'
          created_at?: string
        }
      }
      counselors: {
        Row: {
          id: string
          specialties: string[]
          bio: string | null
          years_of_experience: number
          hourly_rate: number
          available_slots: Json
          created_at: string
        }
        Insert: {
          id: string
          specialties: string[]
          bio?: string | null
          years_of_experience: number
          hourly_rate: number
          available_slots: Json
          created_at?: string
        }
        Update: {
          id?: string
          specialties?: string[]
          bio?: string | null
          years_of_experience?: number
          hourly_rate?: number
          available_slots?: Json
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          counselor_id: string
          date_time: string
          status: 'scheduled' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          counselor_id: string
          date_time: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          counselor_id?: string
          date_time?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          created_at: string
          read_at: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          created_at?: string
          read_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          created_at?: string
          read_at?: string | null
        }
      }
    }
  }
}