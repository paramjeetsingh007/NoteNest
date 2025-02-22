import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logout function with toast notification
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful!", { autoClose: 1000 });
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`, { autoClose: 1000 });
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <NavLink to="/" className="text-3xl font-extrabold text-[#ee6c4d]">
          NoteNest
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <NavLink to="/home" className="hover:text-[#ee6c4d] transition duration-300">
            Home
          </NavLink>
          <NavLink to="/pastes" className="hover:text-[#ee6c4d] transition duration-300">
           Your Notes
          </NavLink>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:block text-sm text-gray-300">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-[#ee6c4d] text-white rounded-full hover:bg-[#d65a3d] transition duration-300 shadow-md hidden md:block"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/auth" className="flex items-center space-x-2 hover:text-[#ee6c4d]">
              <FaUserCircle size={28} />
              <span className="hidden md:block">Login</span>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={26} className="text-[#ee6c4d]" /> : <FaBars size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-6 py-4 bg-gray-900 shadow-md">
          <NavLink to="/home" className="text-lg hover:text-[#ee6c4d] transition duration-300">
            Home
          </NavLink>
          <NavLink to="/pastes" className="text-lg hover:text-[#ee6c4d] transition duration-300">
            Your Notes
          </NavLink>
          {user ? (
            <>
              <span className="text-gray-300">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-[#ee6c4d] text-white rounded-full hover:bg-[#d65a3d] transition duration-300 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth" className="text-lg hover:text-[#ee6c4d] transition duration-300">
              Login
            </NavLink>
          )}
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={1000} />
    </nav>
  );
}

export default Navbar;
