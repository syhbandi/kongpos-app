import axios from "axios";

const URL = "http://misterkong.com/kong_api/pos/api/laporan/pembelian";

const getPembelian = async (data) => {
  const get = await axios.post(URL, data);
  return get.data;
};

const laporanPembelianAPI = {
  getPembelian,
};

export default laporanPembelianAPI;
