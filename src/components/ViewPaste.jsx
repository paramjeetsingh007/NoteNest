import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../firebase"; // Import Firebase config
import { ref, get, child } from "firebase/database";
import { FaArrowLeft } from "react-icons/fa";

function ViewPaste() {
  const { id } = useParams(); // Get paste ID from URL
  const navigate = useNavigate();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching paste for ID:", id); // Debugging log

    const fetchPaste = async () => {
      try {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const usersData = snapshot.val();
          console.log("Users Data:", usersData);

          for (const userId in usersData) {
            const userPastes = usersData[userId]?.pastes;

            if (userPastes && userPastes[id]) {
              setPaste(userPastes[id]);
              console.log("Fetched Paste Data:", userPastes[id]);
              return;
            }
          }
        }
        console.log("No paste found for this ID.");
        setPaste(null);
      } catch (error) {
        console.error("Error fetching paste:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  return (
    <div className="flex justify-center min-h-screen bg-[#293241] px-6 py-12">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-6xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-xl font-semibold text-gray-700 hover:text-gray-900 mb-8 transition-transform duration-200 hover:scale-105"
        >
          <FaArrowLeft className="mr-3 text-2xl" /> Back
        </button>

        {loading ? (
          <p className="text-center text-gray-600 text-xl">Loading Notes...</p>
        ) : paste ? (
          <>
            {/* Paste Title */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">{paste.title}</h2>

            {/* Paste Content */}
            <div className="bg-gray-100 p-8 rounded-lg overflow-x-auto border border-gray-300">
              <pre className="whitespace-pre-wrap break-words text-xl text-gray-800 leading-relaxed">
                {paste.value}
              </pre>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-center text-2xl">Notes not found!</p>
        )}
      </div>
    </div>
  );
}

export default ViewPaste;
