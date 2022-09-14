import api from "../../app/api.config";

const getListSupplierContracted = async (data, token) => {
  const get = await api.post("/get_supplier_contracted", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const getItemContracted = async (data, token) => {
  const get = await api.post("/get_list_item_contracted", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};
const listSupplierContracted = {
  getListSupplierContracted,
};

const getBarangValidasi = async (data, token) => {
  const get = await api.post("/get_barang", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const getSatuan = async (data, token) => {
  const get = await api.post("/get_satuan", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const postValidasi = async (data, token) => {
  const post = await api.post("/submit_validate", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post.data;
};

export {
  listSupplierContracted,
  getItemContracted,
  getBarangValidasi,
  getSatuan,
  postValidasi,
};
