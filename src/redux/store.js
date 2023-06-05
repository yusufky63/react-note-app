import { configureStore } from "@reduxjs/toolkit";
import { notesSlice } from "./notes/notesSlice";
import auth from "./auth";
import aside from "./aside";
export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    auth,
    aside,
  },
});
