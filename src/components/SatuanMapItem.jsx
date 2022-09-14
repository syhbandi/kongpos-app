import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListSatuan,
  reset,
} from "../features/mappingItem/getSatuanValidasi";
import { Comp } from "./componentSatuan";

export const SatuanMapping = ({
  val,
  kd_supplier,
  kd_barang_supplier,
  kd_satuan_supplier,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const { data, status, message } = useSelector((state) => state.getListSatuan);
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClick = async (kd_barang) => {
    setOpen((current) => !current);
    const get = await dispatch(
      getListSatuan({ comp_id: user.usaha.company_id, kd_barang: kd_barang })
    );
    const res = await get.payload;
    setData(res);
  };

  return (
    <div>
      <li onClick={() => handleClick(val.kd_barang)}>{val.nama}</li>
      {open && (
        <>
          {data?.map((value, index) => (
            <Comp
              key={index}
              kd_barang={value.kd_barang}
              kd_satuan={value.kd_satuan}
              jumlah={value.jumlah}
              nama={value.nama}
              kd_supplier={kd_supplier}
              kd_barang_supplier={kd_barang_supplier}
              kd_satuan_supplier={kd_satuan_supplier}
            />
          ))}
        </>
      )}
    </div>
  );
};
