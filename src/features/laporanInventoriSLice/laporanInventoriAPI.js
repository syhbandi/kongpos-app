import api from "../../app/api.config";

const getInventori = async (data, token) => {
  const get = await api.post("/laporan/stok", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanInventoriAPI = {
  getInventori,
};

export default laporanInventoriAPI;
