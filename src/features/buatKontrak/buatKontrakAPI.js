import api from "../../app/api.config";

const getCustomer = async (data, token) => {
  const get = await api.post("/customer_contract", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const postRequestContract = async (data, token) => {
  const post = await api.post("/post_request_contract", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post.data.Pesan;
};

const getSelectedContracted = async (data, token) => {
  const get = await api.post("/selected_contracted", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const postPaymentDt = async (data, token) => {
  const post = await api.post("/post_do_payment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(post);
  return post.data.Pesan;
};

const customerContract = {
  getCustomer,
};
const requestContract = {
  postRequestContract,
};

export {
  customerContract,
  requestContract,
  getSelectedContracted,
  postPaymentDt,
};
