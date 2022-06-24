import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "../features/MenuSlice";
import laporanPenjualanReducer from "../features/laporanPenjualanSlice";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    laporanPenjualan: laporanPenjualanReducer,
  },
});
