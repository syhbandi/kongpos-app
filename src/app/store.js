import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "../features/MenuSlice";
import laporanPenjualanReducer from "../features/laporanPenjualanSlice";
import laporanPembelianReducer from "../features/laporanPembelianSlice";
import laporanBiayaReducer from "../features/laporanBiayaSlice";
import laporanPendapatanReducer from "../features/laporanPendapatanSlice";
import laporanHutangReducer from "../features/laporanHutangSlice";
import laporanPiutangReducer from "../features/laporanPiutangSlice";
import laporanInventoriReducer from "../features/laporanInventoriSLice";
import authReducer from "../features/auth";
import buatKontrakReducer from "../features/buatKontrak";
import compareSupplierReducer from "../features/permintaanKontrak";
import responseContractReducer from "../features/supplierResponseContract";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    laporanPenjualan: laporanPenjualanReducer,
    laporanPembelian: laporanPembelianReducer,
    laporanBiaya: laporanBiayaReducer,
    laporanPendapatan: laporanPendapatanReducer,
    laporanHutang: laporanHutangReducer,
    laporanPiutang: laporanPiutangReducer,
    laporanInventori: laporanInventoriReducer,
    auth: authReducer,
    buatKontrak: buatKontrakReducer,
    compareSupplier: compareSupplierReducer,
    responseContract: responseContractReducer,
  },
});
