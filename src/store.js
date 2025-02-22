import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './features/PasteSlice'
 const store = configureStore({
  reducer: {
    paste:pasteReducer
  },
})

export default store