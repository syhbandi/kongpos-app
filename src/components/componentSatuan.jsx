import { useDispatch, useSelector } from "react-redux";
import { postDataValidasi, reset } from "../features/mappingItem/validasi";
import SweetAlert from "./sweetAlert";
import { useEffect } from "react";

export const Comp = ({
  kd_barang,
  kd_satuan,
  jumlah,
  nama,
  kd_supplier,
  kd_barang_supplier,
  kd_satuan_supplier,
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.postValidasi);
  const handle_check = () => {
    // console.log(user.usaha);
    dispatch(
      postDataValidasi({
        comp_id: user.usaha.company_id,
        user_id: user.usaha.user_id,
        kd_barang_validasi: kd_barang,
        kd_satuan_validasi: kd_satuan,
        kd_supplier: kd_supplier.split("_")[0],
        kd_barang_supplier: kd_barang_supplier,
        kd_satuan_supplier: kd_satuan_supplier[0],
        jumlah: jumlah,
      })
    );
  };
  useEffect(() => {
    if (status === "fulfilled") {
      SweetAlert({
        message: "Berhasil Melakukan permintaan kontrak",
        icon: message,
      });
    }
  });
  return (
    <li>
      <input
        // checked
        onClick={handle_check}
        id="default-radio-2"
        type="radio"
        value=""
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      ></input>
      <label
        htmlFor="default-radio-2"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800"
      >
        {nama}
      </label>
    </li>
  );
};
