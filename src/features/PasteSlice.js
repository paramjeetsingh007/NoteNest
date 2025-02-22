import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../firebase";
import { ref, push, get, remove, set } from "firebase/database";

// Fetch all pastes
export const fetchPastesFromFirebase = createAsyncThunk(
  "paste/fetchPastesFromFirebase",
  async (userId, { rejectWithValue }) => {
    try {
      const pasteRef = ref(database, `users/${userId}/pastes`);
      const snapshot = await get(pasteRef);

      if (snapshot.exists()) {
        return Object.entries(snapshot.val()).map(([id, paste]) => ({ id, ...paste }));
      } else {
        return []; // No pastes found
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Add paste
export const addPasteToFirebase = createAsyncThunk(
  "paste/addPasteToFirebase",
  async ({ userId, title, value }, { rejectWithValue }) => {
    try {
      const pasteRef = ref(database, `users/${userId}/pastes`);
      const newPasteRef = await push(pasteRef, { title, value });
      return { id: newPasteRef.key, title, value };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Delete paste
export const deletePasteFromFirebase = createAsyncThunk(
  "paste/deletePasteFromFirebase",
  async ({ userId, pasteId }, { rejectWithValue }) => {
    try {
      await remove(ref(database, `users/${userId}/pastes/${pasteId}`));
      return pasteId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Update paste
export const updatePasteInFirebase = createAsyncThunk(
  "paste/updatePasteInFirebase",
  async ({ id, title, value }) => {
    await set(ref(database, `pastes/${id}`), { title, value });
    return { id, title, value };
  }
);

const pasteSlice = createSlice({
  name: "paste",
  initialState: { pastes: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder.addCase(fetchPastesFromFirebase.fulfilled, (state, action) => {
      state.pastes = action.payload;
    });
  },
});

export default pasteSlice.reducer;
