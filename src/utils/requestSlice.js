import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      return state.filter(
        (request) => request._id !== action.payload.requestId
      );
    },
    clearRequests: () => null
  }
});

export const { addRequests, removeRequests, clearRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
