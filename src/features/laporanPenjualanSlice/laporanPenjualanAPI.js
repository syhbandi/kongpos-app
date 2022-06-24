import axios from "axios";

const URL = "http://misterkong.com/kong_api/pos/api/laporan/penjualan";

const getPenjualan = async (data) => {
  const get = await axios.post(URL, data);
  return get.data;
};

const laporanPenjualanAPI = {
  getPenjualan,
};

export default laporanPenjualanAPI;
