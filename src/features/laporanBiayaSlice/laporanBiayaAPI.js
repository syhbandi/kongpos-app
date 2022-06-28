import axios from "axios";

const URL = "http://misterkong.com/kong_api/pos/api/laporan/biaya";

const getBiaya = async (data) => {
  const get = await axios.post(URL, data);
  return get.data;
};

const laporanBiayaAPI = {
  getBiaya,
};

export default laporanBiayaAPI;
