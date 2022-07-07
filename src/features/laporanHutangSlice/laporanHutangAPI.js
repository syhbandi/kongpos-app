import api from "../../app/api.config";

const getHutang = async (data, token) => {
  const get = await api.post("/laporan/hutang", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanHutangAPI = {
  getHutang,
};

export default laporanHutangAPI;
