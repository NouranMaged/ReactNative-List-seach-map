import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/reducers/cartReducer";
import searchInputReducer from "../store/reducers/searchInputReducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
    searchInput: searchInputReducer,
  },
});
