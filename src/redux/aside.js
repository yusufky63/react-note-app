import { createSlice } from "@reduxjs/toolkit";

const asideSlice = createSlice({
  name: "aside",
  initialState: {
    aside: true,
  },
  reducers: {
    asideToggle: (state) => {
      state.aside = !state.aside;
    },
  },
});

export const { asideToggle } = asideSlice.actions;
export default asideSlice.reducer;
