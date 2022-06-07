import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "../features/MenuSlice";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
  },
});
