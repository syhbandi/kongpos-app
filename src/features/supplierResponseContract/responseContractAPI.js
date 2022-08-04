import api from "../../app/api.config";

const getResponseContract = async (data, token) => {
  const get = await api.post("/supplier_response_contract", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
};

const postResponseContract = async (data, token) => {
  const post = await api.post("/post_customer_respons_contract", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post.data.Pesan;
};

const responseContract = {
  getResponseContract,
};
const postResponse = {
  postResponseContract,
};

export { responseContract, postResponse };
