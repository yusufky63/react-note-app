import { createSlice } from "@reduxjs/toolkit";

const asideSlice = createSlice({
  name: "aside",
  initialState: {
    aside: false,
  },
  reducers: {
    asideToggle: (state) => {
      state.aside = !state.aside;
    },
  },
});

export const { asideToggle } = asideSlice.actions;
export default asideSlice.reducer;
