import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchPostsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } =
  postsSlice.actions;

export default postsSlice.reducer;
