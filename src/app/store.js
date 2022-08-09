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
import postResponsContractReducer from "../features/supplierResponseContract/postResponsRequest";
import postRequestContractReducer from "../features/buatKontrak/postRequestContract";
import getSupplierReduce from "../features/permintaanKontrak/getSupplier";
import postCompareSupplierReducer from "../features/permintaanKontrak/postCompareSupplier";
import getContractSelectedReducer from "../features/buatKontrak/getContractSelected";
import postPaymentReducer from "../features/buatKontrak/postPayment";
import itemSupplierReducer from "../features/itemSupplier";
import postBarangSatuanReducer from "../features/itemSupplier/postDataBarangSatuan";

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
    postRequestContract: postRequestContractReducer,
    supplierData: getSupplierReduce,
    postcompareSupplier: postCompareSupplierReducer,
    getContractSelected: getContractSelectedReducer,
    postPaymentData: postPaymentReducer,
    postResponseRequest: postResponsContractReducer,
    getItemSupplier: itemSupplierReducer,
    postBarangSatuan: postBarangSatuanReducer,
  },
});
