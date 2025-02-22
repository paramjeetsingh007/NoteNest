import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPasteToFirebase, updatePasteInFirebase } from "../features/PasteSlice";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.paste);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (location.state?.editMode) {
      setEditMode(true);
      setEditId(location.state.paste.id);
      setTitle(location.state.paste.title);
      setValue(location.state.paste.value);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (!title || !value) {
      toast.error("Please fill in both fields!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("Please log in first!");
      return;
    }

    try {
      const pasteData = {
        userId: user.uid,
        title: title.trim(),
        value: value.trim(),
      };

      if (editMode && editId) {
        await dispatch(updatePasteInFirebase({ id: editId, ...pasteData })).unwrap();
        toast.success("Paste updated successfully!");
      } else {
        await dispatch(addPasteToFirebase(pasteData)).unwrap();
        toast.success("Paste added successfully!");
      }

      setTitle("");
      setValue("");
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#293241] p-6 sm:p-4">
      <div className="w-full max-w-4xl sm:max-w-lg bg-white p-8 sm:p-6 shadow-xl rounded-lg">
        <h2 className="text-3xl sm:text-2xl font-bold mb-6 text-center text-[#293241]">
          {editMode ? "Edit Paste" : "Create a New Paste"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <input
            type="text"
            placeholder="Enter your title"
            className="w-full p-4 sm:p-3 text-lg sm:text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293241]"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            placeholder="Enter your text"
            className="w-full h-64 sm:h-40 p-4 sm:p-3 text-lg sm:text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293241]"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button
            type="button"
            className="w-full bg-[#ee6c4d] text-white text-lg sm:text-base p-4 sm:p-3 rounded-md hover:bg-[#293241] transition-all duration-300"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : editMode ? "Update Paste" : "Create Paste"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
