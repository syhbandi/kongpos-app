import api from "../../app/api.config";

const getPembelianOrder = async (data, token) => {
  const get = await api.post("/laporan/pembelian_order", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanPembelianOrderAPI = {
  getPembelianOrder,
};

export default laporanPembelianOrderAPI;
