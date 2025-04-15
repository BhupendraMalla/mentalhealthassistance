// Example SignIn component (React)
import React, { useState } from 'react';
import { supabase } from '../lib/supabase'; //

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      // Sign in successful - Supabase client now manages the session.
      // You'll likely want to redirect the user to their dashboard.
      alert('Sign in successful!');
      // Example: window.location.href = '/dashboard';

    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  // ... JSX for the form ...
  // Include inputs for email and password
  // Display error message if present
  // Disable button when loading

  return (
    <form onSubmit={handleSignIn}>
      <h2>Sign In</h2>
      {/* Email Input */}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      {/* Password Input */}
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}