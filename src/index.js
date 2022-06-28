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
import Pembelian from "./pages/laporan/Pembelian";
import Inventori from "./pages/laporan/Inventori";
import Biaya from "./pages/laporan/Biaya";
import Pendapatan from "./pages/laporan/Pendapatan";
import Hutang from "./pages/laporan/Hutang";
import Piutang from "./pages/laporan/Piutang";
import LabaRugi from "./pages/laporan/LabaRugi";
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
                  path="penjualan-pernota"
                  element={<Penjualan jenis={"1"} />}
                />
                <Route
                  path="penjualan-percustomer"
                  element={<Penjualan jenis={"2"} />}
                />
                <Route
                  path="penjualan-perdivisi"
                  element={<Penjualan jenis={"3"} />}
                />
                <Route
                  path="penjualan-perkas"
                  element={<Penjualan jenis={"4"} />}
                />
                <Route
                  path="penjualan-peruser"
                  element={<Penjualan jenis={"5"} />}
                />
                <Route
                  path="penjualan-perjenis-bayar"
                  element={<Penjualan jenis={"6"} />}
                />
                <Route
                  path="penjualan-pervoucher"
                  element={<Penjualan jenis={"7"} />}
                />
                <Route
                  path="penjualan-perhari"
                  element={<Penjualan jenis={"8"} />}
                />
                <Route
                  path="penjualan-perbulan"
                  element={<Penjualan jenis={"9"} />}
                />
                <Route
                  path="penjualan-pertahun"
                  element={<Penjualan jenis={"10"} />}
                />
                <Route
                  path="penjualan-perbarang"
                  element={<Penjualan jenis={"11"} />}
                />
                <Route
                  path="penjualan-perpegawai"
                  element={<Penjualan jenis={"12"} />}
                />
              </Route>
              <Route path="laporan-pembelian-perperiode">
                <Route
                  path="pembelian-pernota"
                  element={<Pembelian jenis={"1"} />}
                />
                <Route
                  path="pembelian-persupplier-perdivisi"
                  element={<Pembelian jenis={"2"} />}
                />
                <Route
                  path="pembelian-perdivisi"
                  element={<Pembelian jenis={"3"} />}
                />
                <Route
                  path="pembelian-perkas"
                  element={<Pembelian jenis={"4"} />}
                />
                <Route
                  path="pembelian-peruser"
                  element={<Pembelian jenis={"5"} />}
                />
                <Route
                  path="pembelian-perjenis-bayar"
                  element={<Pembelian jenis={"6"} />}
                />
                <Route
                  path="pembelian-perhari"
                  element={<Pembelian jenis={"7"} />}
                />
                <Route
                  path="pembelian-perbulan"
                  element={<Pembelian jenis={"8"} />}
                />
                <Route
                  path="pembelian-pertahun"
                  element={<Pembelian jenis={"9"} />}
                />
                <Route
                  path="pembelian-perbarang-perdivisi"
                  element={<Pembelian jenis={"10"} />}
                />
              </Route>
              <Route>
                <Route path="laporan-inventori">
                  <Route
                    path="stok-akhir-perperiode"
                    element={<Inventori jenis={"1"} />}
                  />
                  <Route
                    path="stok-akhir-perbarang"
                    element={<Inventori jenis={"2"} />}
                  />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-biaya">
                  <Route path="biaya-pernota" element={<Biaya jenis={"1"} />} />
                  <Route
                    path="biaya-perdivisi"
                    element={<Biaya jenis={"2"} />}
                  />
                  <Route path="biaya-perkas" element={<Biaya jenis={"3"} />} />
                  <Route path="biaya-peruser" element={<Biaya jenis={"4"} />} />
                  <Route
                    path="biaya-perjenis-biaya"
                    element={<Biaya jenis={"5"} />}
                  />
                  <Route
                    path="biaya-perjenis-bayar"
                    element={<Biaya jenis={"6"} />}
                  />
                  <Route path="biaya-perhari" element={<Biaya jenis={"7"} />} />
                  <Route
                    path="biaya-perbulan"
                    element={<Biaya jenis={"8"} />}
                  />
                  <Route
                    path="biaya-pertahun"
                    element={<Biaya jenis={"9"} />}
                  />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-pendapatan">
                  <Route
                    path="pendapatan-pernota"
                    element={<Pendapatan jenis={"1"} />}
                  />
                  <Route
                    path="pendapatan-perdivisi"
                    element={<Pendapatan jenis={"2"} />}
                  />
                  <Route
                    path="pendapatan-perkas"
                    element={<Pendapatan jenis={"3"} />}
                  />
                  <Route
                    path="pendapatan-peruser"
                    element={<Pendapatan jenis={"4"} />}
                  />
                  <Route
                    path="pendapatan-perjenis-pendapatan"
                    element={<Pendapatan jenis={"5"} />}
                  />
                  <Route
                    path="pendapatan-perjenis-bayar"
                    element={<Pendapatan jenis={"6"} />}
                  />
                  <Route
                    path="pendapatan-perhari"
                    element={<Pendapatan jenis={"7"} />}
                  />
                  <Route
                    path="pendapatan-perbulan"
                    element={<Pendapatan jenis={"8"} />}
                  />
                  <Route
                    path="pendapatan-pertahun"
                    element={<Pendapatan jenis={"9"} />}
                  />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-hutang">
                  <Route path="hutang-pembelian" element={<Hutang />} />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-piutang">
                  <Route path="piutang-penjualan" element={<Piutang />} />
                </Route>
              </Route>
              <Route path="laba-rugi" element={<LabaRugi />}></Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
