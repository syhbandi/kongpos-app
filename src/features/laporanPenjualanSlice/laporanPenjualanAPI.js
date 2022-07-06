import api from "../../app/api.config";

const getPenjualan = async (data, token) => {
  const get = await api.post("/laporan/penjualan", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanPenjualanAPI = {
  getPenjualan,
};

export default laporanPenjualanAPI;
