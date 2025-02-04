/*
  # Initial Schema for Mental Health Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `full_name` (text)
      - `email` (text)
      - `type` (text) - 'patient' or 'counselor'
      - `created_at` (timestamp)
    
    - `counselors`
      - `id` (uuid, primary key) - References profiles
      - `specialties` (text[])
      - `bio` (text)
      - `years_of_experience` (integer)
      - `hourly_rate` (decimal)
      - `available_slots` (jsonb)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid) - References profiles
      - `counselor_id` (uuid) - References counselors
      - `date_time` (timestamp)
      - `status` (text) - 'scheduled', 'completed', 'cancelled'
      - `notes` (text)
      - `created_at` (timestamp)
    
    - `messages`
      - `id` (uuid, primary key)
      - `sender_id` (uuid) - References profiles
      - `receiver_id` (uuid) - References profiles
      - `content` (text)
      - `created_at` (timestamp)
      - `read_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  full_name text,
  email text UNIQUE NOT NULL,
  type text CHECK (type IN ('patient', 'counselor')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create counselors table
CREATE TABLE counselors (
  id uuid PRIMARY KEY REFERENCES profiles,
  specialties text[],
  bio text,
  years_of_experience integer,
  hourly_rate decimal,
  available_slots jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE counselors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Counselors are viewable by everyone"
  ON counselors FOR SELECT
  USING (true);

CREATE POLICY "Counselors can update own profile"
  ON counselors FOR UPDATE
  USING (auth.uid() = id);

-- Create appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles NOT NULL,
  counselor_id uuid REFERENCES counselors NOT NULL,
  date_time timestamptz NOT NULL,
  status text CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (
    auth.uid() = patient_id OR 
    auth.uid() = counselor_id
  );

CREATE POLICY "Users can insert own appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  USING (
    auth.uid() = patient_id OR 
    auth.uid() = counselor_id
  );

-- Create messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles NOT NULL,
  receiver_id uuid REFERENCES profiles NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Create indexes for better performance
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_counselor_id ON appointments(counselor_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);