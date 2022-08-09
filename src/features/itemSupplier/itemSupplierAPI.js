import api from "../../app/api.config";

const getSupplierItem = async (data, token) => {
  const get = await api.post("/get_list_supplier_item", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const postBarangSatuan = async (data, token) => {
  const post = await api.post("/postBarangSatuan", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post.data.Pesan;
};

const postDataBarangSatuan = {
  postBarangSatuan,
};

export { getSupplierItem, postDataBarangSatuan };
