import api from "../../app/api.config";

const getPembelianRetur = async (data, token) => {
  const get = await api.post("/laporan/pembelian_retur", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanPembelianReturAPI = {
  getPembelianRetur,
};

export default laporanPembelianReturAPI;
