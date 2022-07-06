import { useSelector } from "react-redux";
import Dropdown from "../components/Dropdown";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="shadow-lg border border-gray-200 rounded-lg p-4 bg-opacity-70 bg-white">
        <h1 className="text-2xl text-black mb-2">
          Selamat datang, <span className="font-bold">{user.nama_user}</span>!
        </h1>
        <p className="text-lg text-black">
          {user.usaha ? (
            <span>Usaha aktif: {user.usaha.nama_usaha}</span>
          ) : (
            <span>Pilih usaha untuk memulai</span>
          )}
        </p>
      </div>
    </>
  );
};

export default Dashboard;
