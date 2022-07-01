import axios from "axios";

const URL = "http://misterkong.com/kong_api/pos/api/laporan/piutang";

const getPiutang = async (data) => {
  const get = await axios.post(URL, data);
  return get.data;
};

const laporanPiutangAPI = {
  getPiutang,
};

export default laporanPiutangAPI;
