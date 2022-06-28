import axios from "axios";

const URL = "http://misterkong.com/kong_api/pos/api/laporan/pendapatan";

const getPendapatan = async (data) => {
  const get = await axios.post(URL, data);
  return get.data;
};

const laporanPendapatanAPI = {
  getPendapatan,
};

export default laporanPendapatanAPI;
