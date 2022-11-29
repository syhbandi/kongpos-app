import { useDispatch, useSelector } from "react-redux";
import { postDataValidasi, reset } from "../features/mappingItem/validasi";
import SweetAlert from "./sweetAlert";
import { useEffect } from "react";
import { useState } from "react";

export const Comp = ({
  kd_barang,
  kd_satuan,
  jumlah,
  nama,
  kd_supplier,
  kd_barang_supplier,
  kd_satuan_supplier,
  barang_customer,
  satuan_customer,
}) => {
  return (
    <li>
      <input
        // checked
        // onClick={handle_check}
        // checked={nama === satuan_customer ? true : false}
        id="default-radio-2"
        type="radio"
        value={`${kd_barang}__${kd_satuan}__${kd_barang_supplier}__${kd_satuan_supplier}__${jumlah}__${kd_supplier}`}
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
