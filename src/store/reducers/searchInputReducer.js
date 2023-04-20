import { createSlice } from "@reduxjs/toolkit";
import { apiResponse } from "../../apis/cardData";

export const searchInputSlice = createSlice({
  name: "searchInput",
  initialState: {
    searchInput: "",
    searchedData: [],
  },
  reducers: {
    handleSearchInput: (state, action) => {
      state.searchInput = action.payload;

      const updatedData = apiResponse.businesses.filter((item) => {
        const itemData = `${item.name.toUpperCase()})`;
        const textData = action.payload.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      state.searchedData = updatedData;
    },
  },
});
export const { handleSearchInput } = searchInputSlice.actions;
export default searchInputSlice.reducer;
