import api from "../../app/api.config";

const getPendapatan = async (data, token) => {
  const get = await api.post("/laporan/pendapatan", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanPendapatanAPI = {
  getPendapatan,
};

export default laporanPendapatanAPI;
