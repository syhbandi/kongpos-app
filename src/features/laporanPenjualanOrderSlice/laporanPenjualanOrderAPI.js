import api from "../../app/api.config";

const getPenjualanOrder = async (data, token) => {
  const get = await api.post("/laporan/penjualan_order", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanPenjualanOrderAPI = {
  getPenjualanOrder,
};

export default laporanPenjualanOrderAPI;
