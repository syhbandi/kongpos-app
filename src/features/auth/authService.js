import api from "../../app/api.config";

const login = async (no_hp, passwd) => {
  const get = await api.post("auth/login", {
    no_hp,
    passwd,
  });
  const dataUser = { ...get.data, no_hp };
  localStorage.setItem("user", JSON.stringify(dataUser));
  return dataUser;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getUsahas = async () => {};

const authService = {
  login,
  logout,
};

export default authService;
