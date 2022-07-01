import axios from "axios";

const URL = "http://misterkong.com/kong_api/pos/api/laporan/stok";

const getInventori = async (data) => {
  const get = await axios.post(URL, data);
  return get.data;
};

const laporanInventoriAPI = {
  getInventori,
};

export default laporanInventoriAPI;
