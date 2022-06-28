import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "../features/MenuSlice";
import laporanPenjualanReducer from "../features/laporanPenjualanSlice";
import laporanPembelianReducer from "../features/laporanPembelianSlice";
import laporanBiayaReducer from "../features/laporanBiayaSlice";
import laporanPendapatanReducer from "../features/laporanPendapatanSlice";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    laporanPenjualan: laporanPenjualanReducer,
    laporanPembelian: laporanPembelianReducer,
    laporanBiaya: laporanBiayaReducer,
    laporanPendapatan: laporanPendapatanReducer,
  },
});
