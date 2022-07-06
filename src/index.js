import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
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
import dataLaporanPenjualan from "./dataSource/laporanPenjualan";
import dataLaporanPembelian from "./dataSource/laporanPembelian";
import dataLaporanBiaya from "./dataSource/laporanBiaya";
import dataLaporanPendapatan from "./dataSource/laporanPendapatan";

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
                {dataLaporanPenjualan.map((data) => (
                  <Route
                    key={data.jenis}
                    path={data.path}
                    element={
                      <Penjualan
                        jenis={data.jenis}
                        sumColumn={data.sumColumn}
                      />
                    }
                  />
                ))}
              </Route>
              <Route path="laporan-pembelian-perperiode">
                {dataLaporanPembelian.map((data) => (
                  <Route
                    key={data.jenis}
                    path={data.path}
                    element={
                      <Pembelian
                        jenis={data.jenis}
                        sumColumn={data.sumColumn}
                      />
                    }
                  />
                ))}
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
                  {dataLaporanBiaya.map((data) => (
                    <Route
                      key={data.jenis}
                      path={data.path}
                      element={
                        <Biaya jenis={data.jenis} sumColumn={data.sumColumn} />
                      }
                    />
                  ))}
                </Route>
              </Route>
              <Route>
                <Route path="laporan-pendapatan">
                  {dataLaporanPendapatan.map((data) => (
                    <Route
                      key={data.jenis}
                      path={data.path}
                      element={
                        <Pendapatan
                          jenis={data.jenis}
                          sumColumn={data.sumColumn}
                        />
                      }
                    />
                  ))}
                </Route>
              </Route>
              <Route>
                <Route path="laporan-hutang">
                  <Route
                    path="hutang-pembelian"
                    element={
                      <Hutang
                        sumColumn={[
                          "Total Pembelian",
                          "Total Cicilan",
                          "Sisa Hutang",
                        ]}
                      />
                    }
                  />
                </Route>
              </Route>
              <Route>
                <Route path="laporan-piutang">
                  <Route
                    path="piutang-penjualan"
                    element={
                      <Piutang
                        sumColumn={[
                          "Total Penjualan",
                          "Total Cicilan",
                          "Sisa Piutang",
                        ]}
                      />
                    }
                  />
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
