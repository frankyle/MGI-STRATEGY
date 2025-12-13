import { AppSidebar } from "./AppSidebar";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Get current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AppSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-white px-4 shadow-sm justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <h1 className="text-lg font-bold">MGI Trading Journal</h1>

          {/* Auth Buttons / User Name */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/signin"
                  className="px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <span className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 font-medium">
                {user.user_metadata?.full_name || user.email}
              </span>
            )}
          </div>
        </header>

        {/* Main content */}
        <motion.main
          className="flex-1 p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
