import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "../features/MenuSlice";
import laporanPenjualanReducer from "../features/laporanPenjualanSlice";
import laporanPenjualanOrderReducer from "../features/laporanPenjualanOrderSlice";
import laporanPenjualanReturReducer from "../features/laporanPenjualanReturSlice";
import laporanPembelianReducer from "../features/laporanPembelianSlice";
import laporanPembelianOrderReducer from "../features/laporanPembelianOrderSlice";
import laporanPembelianReturReducer from "../features/laporanPembelianReturSlice";
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
import getListSupplierContractedReducer from "../features/mappingItem/getListSupplier";
import listItemContractedReducer from "../features/mappingItem/itemContracted";
import listBarangValidasiReducer from "../features/mappingItem/getValidasiBarang";
import listSatuanReducer from "../features/mappingItem/getSatuanValidasi";
import postValidasiReducer from "../features/mappingItem/validasi";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    laporanPenjualan: laporanPenjualanReducer,
    laporanPenjualanOrder: laporanPenjualanOrderReducer,
    laporanPenjualanRetur: laporanPenjualanReturReducer,
    laporanPembelian: laporanPembelianReducer,
    laporanPembelianOrder: laporanPembelianOrderReducer,
    laporanPembelianRetur: laporanPembelianReturReducer,
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
    getSupplierContracted: getListSupplierContractedReducer,
    getListItemContracted: listItemContractedReducer,
    getListBarang: listBarangValidasiReducer,
    getListSatuan: listSatuanReducer,
    postValidasi: postValidasiReducer,
  },
});
