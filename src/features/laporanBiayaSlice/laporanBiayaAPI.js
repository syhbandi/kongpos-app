import api from "../../app/api.config";

const getBiaya = async (data, token) => {
  const get = await api.post("/laporan/biaya", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanBiayaAPI = {
  getBiaya,
};

export default laporanBiayaAPI;
