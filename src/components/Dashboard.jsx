import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleGetStarted = () => {
    if (currentUser) {
      navigate("/home"); // ✅ Go to Home if logged in
    } else {
      navigate("/auth"); // ✅ Go to Signup/Login if not logged in
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#293241] px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        Welcome to NoteNest
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg md:text-xl text-white mb-2"
      >
        Save your Notes Here
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-lg md:text-xl text-white mb-4 max-w-lg"
      >
        Create beautiful notes with ease and keep them organized.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={handleGetStarted}
        className="mt-4 px-6 py-3 text-lg md:text-xl font-semibold text-white bg-[#ee6c4d] rounded-full transition-transform duration-300 shadow-md hover:bg-[#d65b40] focus:outline-none"
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Dashboard;
