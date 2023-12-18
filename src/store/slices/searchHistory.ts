// searchHistorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: [] as string[],
  reducers: {
    addSearch: (state: string[], action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
  },
});

export const { addSearch } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
