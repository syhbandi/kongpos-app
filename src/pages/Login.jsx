import axios from "axios";
import { useState } from "react";
import logoKongpos from "../assets/logo-kongpos-app.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let dtToken = [];

  // function setToken(token) {
  //   localStorage.setItem("tokenJson", JSON.stringify(token));
  // }

  // function getToken(value) {
  //   dtToken = JSON.parse(localStorage.getItem(value));
  //   console.log("token" + dtToken);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    console.log(password);
    dispatch(login({ user, password }));
    // navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-red-50">
      <div className="flex flex-col gap-5 items-center mb-7">
        <img src={logoKongpos} alt="" className="w-20" />
        <span className="font-bold text-4xl">KONGPOS</span>
      </div>
      <div className="w-[400px] rounded-lg shadow-xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-2xl font-bold">Login</span>
          <span className="text-xl cursor-pointer hover:text-[#ffc90d]">
            Daftar
          </span>
        </div>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <input
            type="text"
            className=" rounded-lg border-2 p-3 focus:outline-none focus:border-[#ffc90d]"
            placeholder="Email/No.hp"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <input
            type="password"
            className=" rounded-lg border-2 p-3 focus:outline-none focus:border-[#ffc90d]"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            className=" px-5 py-3 bg-[#ffc90d] font-bold text-lg rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
