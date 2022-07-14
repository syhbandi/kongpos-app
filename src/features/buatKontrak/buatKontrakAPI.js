import api from "../../app/api.config";

const getCustomer = async (data, token) => {
  const get = await api.post("/customer_contract", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const customerContract = {
  getCustomer,
};

export default customerContract;
