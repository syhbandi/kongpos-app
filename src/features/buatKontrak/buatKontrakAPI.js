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
};

const customerContract = {
  getCustomer,
};
const requestContract = {
  postRequestContract,
};

export { customerContract, requestContract };
