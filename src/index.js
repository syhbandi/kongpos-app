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
            <Route path="laporan" element={<Laporan />} />
            <Route path="kontrak" element={<Kontrak />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
