import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Master } from "./pages/master/Index";
import Laporan from "./pages/Laporan";
import Kontrak from "./pages/Kontrak";
import Login from "./pages/Login";
import Barang from "./pages/master/barang";
import AddBarang from "./pages/master/barang/AddBarang";
import {
  PenjualanPerdivisi,
  PenjualanPercustomer,
  PenjualanPeruser,
  PenjualanPerkas,
  PenjualanPerbarang,
  PenjualanPerpegawai,
} from "./pages/laporan/PenjualanPerperiode";
import {
  PembelianPerbarang,
  PembelianPeruser,
  PembelianPerdivisi,
  PembelianPerkas,
  PembelianPersupplier,
} from "./pages/laporan/PembelianPerperiode";
import {
  SA_perbarang,
  SA_perbarang_perdivisi,
  SA_perperiode,
} from "./pages/laporan/Inventori";
import {
  Biaya_perdivisi,
  Biaya_perjenis_biaya,
  Biaya_perkas,
} from "./pages/laporan/Biaya";
import {
  Pendapatan_perdivisi,
  Pendapatan_perkas,
  Pendapatan_perjenis_pendapatan,
} from "./pages/laporan/Pendapatan";
import { Hutang_pembelian } from "./pages/laporan/Hutang";
import { Piutang_penjualan } from "./pages/laporan/Piutang";
import { Laba_rugi } from "./pages/laporan/LabaRugi";
import Penjualan from "./pages/laporan/Penjualan";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="master">
              <Route path="barang">
                <Route index element={<Barang />} />
                <Route path="addBarang" element={<AddBarang />} />
                <Route path=":barangId" element={<Barang />} />
              </Route>
            </Route>
            <Route path="laporan">
              <Route path="laporan-penjualan-perperiode">
                <Route
                  path="penjualan-perdivisi"
                  element={<Penjualan jenis={"1"} />}
                />
                <Route
                  path="penjualan-percustomer"
                  element={<Penjualan jenis={"2"} />}
                />
                <Route
                  path="penjualan-peruser"
                  element={<PenjualanPeruser />}
                />
                <Route path="penjualan-perkas" element={<PenjualanPerkas />} />
                <Route
                  path="penjualan-perbarang"
                  element={<PenjualanPerbarang />}
                />
                <Route
                  path="penjualan-perpegawai"
                  element={<PenjualanPerpegawai />}
                />
              </Route>
              <Route path="laporan-pembelian-perperiode">
                <Route
                  path="pembelian-persupplier"
                  element={<PembelianPersupplier />}
                />
                <Route
                  path="pembelian-perdivisi"
                  element={<PembelianPerdivisi />}
                />
                <Route path="pembelian-perkas" element={<PembelianPerkas />} />
                <Route
                  path="pembelian-peruser"
                  element={<PembelianPeruser />}
                />
                <Route
                  path="pembelian-perbarang"
                  element={<PembelianPerbarang />}
                />
              </Route>
              <Route>
                <Route path="laporan-inventori">
                  <Route
                    path="stok-akhir-perperiode"
                    element={<SA_perperiode />}
                  />
                  <Route
                    path="stok-akhir-perbarang"
                    element={<SA_perbarang />}
                  />
                  <Route
                    path="stok-akhir-perbarang-perdivisi"
                    element={<SA_perbarang_perdivisi />}
                  />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-biaya">
                  <Route path="biaya-perkas" element={<Biaya_perkas />} />
                  <Route path="biaya-perdivisi" element={<Biaya_perdivisi />} />
                  <Route
                    path="biaya-perjenis-biaya"
                    element={<Biaya_perjenis_biaya />}
                  />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-pendapatan">
                  <Route
                    path="Pendapatan-perkas"
                    element={<Pendapatan_perkas />}
                  />
                  <Route
                    path="Pendapatan-perdivisi"
                    element={<Pendapatan_perdivisi />}
                  />
                  <Route
                    path="Pendapatan-perjenis-Pendapatan"
                    element={<Pendapatan_perjenis_pendapatan />}
                  />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-hutang">
                  <Route
                    path="hutang-pembelian"
                    element={<Hutang_pembelian />}
                  />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-piutang">
                  <Route
                    path="piutang-penjualan"
                    element={<Piutang_penjualan />}
                  />
                </Route>
              </Route>
              <Route path="laba-rugi" element={<Laba_rugi />}></Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
