import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPastesFromFirebase,
  deletePasteFromFirebase,
} from "../features/PasteSlice";
import { useNavigate } from "react-router-dom";
import { FaClipboard, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";

function Pastes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const currentUser = auth.currentUser; // Fetch logged-in user
  const { pastes, loading, error } = useSelector((state) => state.paste);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchPastesFromFirebase(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  const ViewPage = (id) => {
    navigate(`/pastes/${id}`);
  };

  const copyToClipboard = (text, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", { autoClose: 1000 });
  };

  const deletePaste = (pasteId, e) => {
    e.stopPropagation();
    if (currentUser) {
      dispatch(deletePasteFromFirebase({ userId: currentUser.uid, pasteId }));
      toast.info("Notes deleted successfully!", { autoClose: 1000 });
    } else {
      toast.error("You must be logged in to delete a Notes!", { autoClose: 1000 });
    }
  };

  const editPaste = (paste, e) => {
    e.stopPropagation();
    navigate("/home", { state: { editMode: true, paste } });
  };

  return (
    <div className="bg-[#293241] p-4 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-4 text-white">Your All Notes</h2>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="max-w-2xl mx-auto">
        {pastes.length === 0 ? (
          <p className="text-center text-gray-600">No Notes available.</p>
        ) : (
          pastes.map((paste) => (
            <div
              key={paste.id}
              className="bg-white p-4 mb-4 shadow-md rounded-md cursor-pointer hover:shadow-lg transition"
              onClick={() => ViewPage(paste.id)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{paste.title}</h3>
              <p className="text-gray-600 mt-2">{paste.value}</p>

              <div className="flex space-x-3 mt-3">
                <button
                  onClick={(e) => deletePaste(paste.id, e)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>

                <button
                  onClick={(e) => copyToClipboard(paste.value, e)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition"
                >
                  <FaClipboard className="mr-2" /> Copy
                </button>

                <button
                  onClick={(e) => editPaste(paste, e)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Pastes;