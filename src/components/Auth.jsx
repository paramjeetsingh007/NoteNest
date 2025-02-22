import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Signup successful!", { autoClose: 1000 });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!", { autoClose: 1000 });
      }
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(`${isSignup ? "Signup" : "Login"} failed: ${error.message}`, { autoClose: 3000 });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      // Attempt Google sign-in with a popup
      try {
        const result = await signInWithPopup(auth, provider);
        toast.success(`Welcome, ${result.user.displayName}!`, { autoClose: 1000 });
        setTimeout(() => navigate("/"), 1000);
      } catch (error) {
        // If popup blocked or cancelled, fallback to redirect
        if (error.code === "auth/popup-blocked" || error.code === "auth/cancelled-popup-request") {
          await signInWithRedirect(auth, provider);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Google Authentication Error:", error);
      toast.error(`Google login failed: ${error.message}`, { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-[#ee6c4d] text-white rounded-lg hover:bg-[#293241] transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleGoogleAuth}
            className="w-full p-3 bg-white text-black rounded-lg hover:bg-gray-300 transition"
          >
            Continue with Google
          </button>
        </div>
        <p
          className="text-white text-center mt-4 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </motion.div>
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default Auth;
