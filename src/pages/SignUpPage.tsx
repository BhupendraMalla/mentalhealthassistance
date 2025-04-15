// Example SignUp component (React)
import React, { useState } from 'react';
import { supabase } from '../lib/supabase'; //

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'patient' | 'counselor'>('patient'); //
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          // Additional data to store in auth.users table (optional)
          data: {
            full_name: fullName,
            // Note: We store the primary 'type' in the public.profiles table
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Signup successful, but no user data returned.");

      // 2. Create a corresponding profile in the public.profiles table
      const { error: profileError } = await supabase
        .from('profiles') //
        .insert({
          id: authData.user.id, // Link profile to the authenticated user
          full_name: fullName,
          email: email,
          type: userType
        }); //

      if (profileError) throw profileError;

      alert('Sign up successful! Please check your email to verify.');
      // Redirect user or clear form

    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // ... JSX for the form ...
  // Include inputs for email, password, fullName, and a select/radio for userType
  // Display error message if present
  // Disable button when loading

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      {/* Email Input */}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      {/* Password Input */}
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      {/* Full Name Input */}
      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
      {/* User Type Selection */}
      <select value={userType} onChange={(e) => setUserType(e.target.value as 'patient' | 'counselor')}>
          <option value="patient">I am a Patient</option>
          <option value="counselor">I am a Counselor</option>
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
}
