import axios from "axios";

const URL = "http://misterkong.com/kong_api/pos/api/laporan/hutang";

const getHutang = async (data) => {
  const get = await axios.post(URL, data);
  return get.data;
};

const laporanHutangAPI = {
  getHutang,
};

export default laporanHutangAPI;
