import logoKongpos from "../assets/logo-kongpos-app.png";
const Login = () => {
  const onSubmit = (e) => {};
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-red-50">
      <div className="flex flex-col gap-5 items-center mb-7">
        <img src={logoKongpos} alt="" className="w-20" />
        <span className="font-bold text-6xl">KONGPOS</span>
      </div>
      <div className="w-[450px] rounded-lg shadow-xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-4xl font-bold">Login</span>
          <span className="text-2xl cursor-pointer hover:text-[#ffc90d]">
            Daftar
          </span>
        </div>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <input
            type="text"
            className="text-xl rounded-lg border-2 p-3 focus:outline-none focus:border-[#ffc90d]"
            placeholder="Email/No.hp"
          />
          <input
            type="password"
            className="text-xl rounded-lg border-2 p-3 focus:outline-none focus:border-[#ffc90d]"
            placeholder="Password"
          />
          <button
            type="submit"
            className=" px-5 py-3 bg-[#ffc90d] font-bold text-xl rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
