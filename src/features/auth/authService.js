import api from "../../app/api.config";

const login = async (no_hp, passwd) => {
  const get = await api.post("/auth/login", {
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

const getUsahas = async (noHp) => {
  const usahas = await api.post("/login_get_cid", {
    no_hp: noHp,
  });

  // console.log(usahas.data);
  return usahas.data;
};

const authService = {
  login,
  logout,
  getUsahas,
};

export default authService;
