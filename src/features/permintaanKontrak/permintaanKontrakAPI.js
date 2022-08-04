import api from "../../app/api.config";

const getSupplier = async (data, token) => {
  const get = await api.post("/compare_supplier", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};
const getSupplierDt = async (data, token) => {
  const get = await api.post("/m_supplier", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};
const postCompareSupplier = async (data, token) => {
  const post = await api.post("/post_compare_supplier_data", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post.data.Pesan;
};

const compareSupplier = {
  getSupplier,
};
const dataSupplier = {
  getSupplierDt,
};
const postCompareSupplierDt = {
  postCompareSupplier,
};
export { compareSupplier, dataSupplier, postCompareSupplierDt };
