import api from "../../app/api.config";

const getPenjualanRetur = async (data, token) => {
  const get = await api.post("/laporan/penjualan_retur", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanPenjualanReturAPI = {
  getPenjualanRetur,
};

export default laporanPenjualanReturAPI;
