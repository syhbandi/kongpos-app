import api from "../../app/api.config";

const getPembelian = async (data, token) => {
  const get = await api.post("/laporan/pembelian", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const laporanPembelianAPI = {
  getPembelian,
};

export default laporanPembelianAPI;
