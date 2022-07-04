import { useState } from "react";
import logoKongpos from "../assets/logo-kongpos-app.png";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, message } = useSelector((state) => state.auth);
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ noHp, password }));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/");
    }
  }, [status, dispatch, navigate]);
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
        {status === "rejected" && (
          <div className="rounded-lg p-4 bg-red-400 bg-opacity-30 font-medium text-red-700 mb-3">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-3" />
            {message}
          </div>
        )}
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <input
            type="text"
            className=" rounded-lg border-2 p-3 focus:outline-none focus:border-[#ffc90d]"
            placeholder="Email/No.hp"
            onChange={(e) => setNoHp(e.target.value)}
            value={noHp}
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
            className={`px-5 py-3 bg-[#ffc90d] hover:bg-yellow-500 font-bold text-lg rounded-lg disabled:bg-yellow-300 disabled:cursor-not-allowed`}
            disabled={status === "pending" ? true : false}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
