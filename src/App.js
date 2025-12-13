import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Your pages
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Toast
import { Toaster, toast } from "react-hot-toast";
import SignUp from "./components/authentication/SignUp";
import SignIn from "./components/authentication/SignIn";
import FundedAccount from "./pages/FundedAccount/FundedAccount";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import TradersIdea from "./pages/TradersIdea/TradersIdea";
import MgiStrategy from "./pages/MgiStrategy/MgiStrategy";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

function App() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      {/* Wrap all pages in DashboardLayout */}
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personal" element={<PersonalAccount />} />
          <Route path="/funded" element={<FundedAccount />} />
          <Route path="/tradersidea" element={<TradersIdea />} />
          <Route path="/mgi" element={<MgiStrategy />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />
    </motion.div>
  );
}

export default App;
export { toast };
