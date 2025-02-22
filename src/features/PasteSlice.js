import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../firebase";
import { ref, push, get, remove, set } from "firebase/database";

// Fetch all pastes
export const fetchPastesFromFirebase = createAsyncThunk(
  "paste/fetchPastesFromFirebase",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("Fetching pastes for user:", userId);
      const pasteRef = ref(database, `users/${userId}/pastes`);
      const snapshot = await get(pasteRef);

      if (snapshot.exists()) {
        console.log("Fetched pastes:", snapshot.val());
        return Object.entries(snapshot.val()).map(([id, paste]) => ({ id, ...paste }));
      } else {
        console.log("No pastes found");
        return [];
      }
    } catch (error) {
      console.error("Error fetching pastes:", error);
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
  async ({ userId, id, title, value }, { rejectWithValue }) => {
    try {
      await set(ref(database, `users/${userId}/pastes/${id}`), { title, value });
      return { id, title, value };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const pasteSlice = createSlice({
  name: "paste",
  initialState: { pastes: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastesFromFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastesFromFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.pastes = action.payload;
      })
      .addCase(fetchPastesFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPasteToFirebase.fulfilled, (state, action) => {
        state.pastes.push(action.payload);
      })
      .addCase(deletePasteFromFirebase.fulfilled, (state, action) => {
        state.pastes = state.pastes.filter((paste) => paste.id !== action.payload);
      })
      .addCase(updatePasteInFirebase.fulfilled, (state, action) => {
        const index = state.pastes.findIndex((paste) => paste.id === action.payload.id);
        if (index !== -1) {
          state.pastes[index] = action.payload;
        }
      });
  },
});


export default pasteSlice.reducer;
