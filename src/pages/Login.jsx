import { useState } from "react";
import logoKongpos from "../assets/logo-kongpos-app.png";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, message } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newNoHp = noHp.slice(0, 1) === "0" ? `62${noHp.slice(1)}` : noHp;
    dispatch(login({ noHp: newNoHp, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-blue-700 bg-opacity-30 p-5">
      <div className="flex flex-col gap-5 items-center mb-7">
        <img src={logoKongpos} alt="" className="w-16" />
        <span className="font-bold text-3xl">KONGPOS</span>
      </div>
      <div className="w-full md:w-[400px] md:mx-0 rounded-lg shadow-xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xl font-bold">Login</span>
          <span className="text-lg cursor-pointer text-blue-700 hover:text-blue-900 font-medium">
            Daftar
          </span>
        </div>

        {/* kalo login gagal */}
        {status === "rejected" && (
          <div className="rounded-lg p-4 bg-red-400 bg-opacity-30 font-medium text-red-700 mb-3">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-3" />
            {message}
          </div>
        )}

        <form className="flex flex-col gap-3" onSubmit={onSubmit} noValidate>
          <input
            type="text"
            className=" rounded-lg border-2 px-4 py-3 focus:outline-none focus:border-[#ffc90d]"
            placeholder="No.hp"
            onChange={(e) => setNoHp(e.target.value)}
            value={noHp}
          />
          <input
            type="password"
            className=" rounded-lg border-2 px-4 py-3 focus:outline-none focus:border-[#ffc90d]"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            className={`px-4 py-3 bg-[#ffc90d] hover:bg-yellow-500 font-bold text-base rounded-lg disabled:bg-opacity-50 disabled:cursor-not-allowed`}
            disabled={status === "pending" ? true : false}
          >
            {status === "pending" ? (
              <div className="flex items-center gap-3 justify-center">
                <svg
                  role="status"
                  className="w-5 h-5 text-yellow-300 animate-spin  fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-white">Sedang proses</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
