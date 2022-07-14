import api from "../../app/api.config";

const getResponseContract = async (data, token) => {
  const get = await api.post("/supplier_response_contract", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const responseContract = {
  getResponseContract,
};

export default responseContract;
