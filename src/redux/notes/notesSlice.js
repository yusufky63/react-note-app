import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    note: [],
    noteArchive: [],
    activeFilter: "",
    activeFilterArchive: "",
  },
  reducers: {
   
    filterNoteArchive: (state, action) => {
      state.activeFilterArchive = action.payload;
    },
    setNotesArchive: (state, action) => {
      state.noteArchive = action.payload;
    },
    filterNote: (state, action) => {
      state.activeFilter = action.payload;
    },
    setNotes: (state, action) => {
      state.note = action.payload;
    },
  },
});

export const notes = (state) => state.notes.note;
export const archive = (state) => state.notes.noteArchive;
export const { filterNote, setNotes, setNotesArchive, filterNoteArchive } =
  notesSlice.actions;
