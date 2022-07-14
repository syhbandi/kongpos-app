import api from "../../app/api.config";

const getSupplier = async (data, token) => {
  const get = await api.post("/compare_supplier", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const compareSupplier = {
  getSupplier,
};

export default compareSupplier;
