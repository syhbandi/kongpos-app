import axios from "axios";

const url = "http://misterkong.com/kong_api/pos/api/auth/login";

const login = async (no_hp, passwd) => {
  console.log(no_hp, passwd);
  const get = await axios.post(url, {
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

const authService = {
  login,
  logout,
};

export default authService;
