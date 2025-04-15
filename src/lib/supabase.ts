// import { createClient } from '@supabase/supabase-js';
// import type { Database } from './database.types';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);



// src/lib/supabase.ts (Corrected State)
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types'; // Make sure this import is correct

// Ensure these environment variables are set in your .env file
// Create a .env file in the root of your project if you don't have one
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add a check to ensure the variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and/or Anon Key are not defined in environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.");
}

// Initialize and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);