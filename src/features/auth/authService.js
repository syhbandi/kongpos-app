import axios from "axios";

const url = "http://misterkong.com/kong_api/pos/api/auth/login";

async function login(no_hp, passwd) {
  const getData = await axios.post(url, {
    no_hp: no_hp,
    passwd: passwd,
  });
  console.log(getData);
  //   localStorage.setItem("token", JSON.stringify(getData.data.access_token));
  //   return getData.data.access_token;
}

export const authService = { login };
