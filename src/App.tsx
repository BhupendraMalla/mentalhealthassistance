import { Heart, Phone, Calendar, MessageCircle, Shield, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react'; // Combined React import
import { supabase } from './lib/supabase'; // Adjust the path as necessary
import { Session } from '@supabase/supabase-js';
import SignInPage from './pages/SignInPage'; // Make sure these paths are correct
import SignUpPage from './pages/SignUpPage'; // Make sure these paths are correct

function App() {
  // --- MOVE ALL THIS LOGIC INSIDE App() ---
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Set loading false after checking
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup listener
    return () => subscription.unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Loading Check ---
  if (loading) {
    // Return loading indicator INSIDE App()
    return <div>Loading...</div>;
  }

  // --- Conditional Return Logic ---
  // This main return is INSIDE App()
  return (
    <div> {/* Use a root element or React Fragment <> */}
      {!session ? (
        // If NO session, show Login/Signup pages
        <div>
          <SignInPage />
          <SignUpPage />
          {/* You might want routing later to show only one at a time */}
        </div>
      ) : (
        // If there IS a session, show your ORIGINAL landing page content
        // --- PASTE YOUR ORIGINAL LANDING PAGE JSX HERE ---
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
          <button onClick={() => supabase.auth.signOut()} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 z-20">
            Sign Out
          </button>
          {/* Hero Section */}
          <header className="relative h-screen flex items-center justify-center text-center px-4">
            {/* Welcome message can be added here if desired */}
            {/* <p className="absolute top-4 left-4 text-purple-800 z-20">Welcome {session.user.email}</p> */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80"
                alt="Peaceful background"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-purple-900 mb-6">
                Your Mental Health Matters
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                Take the first step towards a healthier mind. We're here to support your journey.
              </p>
              <button className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors">
                Get Support Now
              </button>
            </div>
          </header>

          {/* Services Section */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                How We Can Help
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <MessageCircle className="w-10 h-10 text-purple-600" />, title: "Online Counseling", description: "Connect with licensed therapists from the comfort of your home" },
                  { icon: <Users className="w-10 h-10 text-purple-600" />, title: "Support Groups", description: "Join our community and share experiences in a safe space" },
                  { icon: <Shield className="w-10 h-10 text-purple-600" />, title: "Crisis Support", description: "24/7 emergency support when you need it most" }
                ].map((service, index) => (
                  <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-purple-900 text-white py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Take the first step towards better mental health today.
                Our compassionate team is here to support you.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-100 transition-colors">
                  <Phone className="inline-block mr-2 w-5 h-5" /> Call Now
                </button>
                <button className="bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-800 transition-colors">
                  <Calendar className="inline-block mr-2 w-5 h-5" /> Schedule Consultation
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 py-12 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <Heart className="w-8 h-8 text-purple-500 mr-2" />
                <span className="text-xl font-semibold">MentalHealthCare</span>
              </div>
              <div className="text-sm">
                © 2025 MentalHealthCare. All rights reserved.
                <br />
                <span className="text-purple-400">Emergency? Call 988 for immediate support</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div> // Close the root element
  );
} // <<<< Function App() closing brace is here

export default App; // Export is outside the function body, which is correct