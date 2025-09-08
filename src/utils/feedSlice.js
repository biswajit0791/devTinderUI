import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFromFeed: (state, action) =>
      state.filter((user) => user._id !== action.payload.userId),
    clearFeed: () => null
  }
});

export default feedSlice.reducer;
export const { addFeed, removeUserFromFeed, clearFeed } = feedSlice.actions;
