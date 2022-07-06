import api from "../../app/api.config";

const getPiutang = async (data, token) => {
  const get = await api.post("/laporan/piutang", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanPiutangAPI = {
  getPiutang,
};

export default laporanPiutangAPI;
