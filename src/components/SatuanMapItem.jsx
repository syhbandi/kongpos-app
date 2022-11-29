import { current } from "@reduxjs/toolkit";
import { useEffect } from "react";
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
  barang_customer,
  satuan_customer,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClick = async (kd_barang, nama) => {
    // alert(barang_customer + "=" + nama);
    setOpen((current) => !current);
    // setOpen(true);
    const get = await dispatch(
      getListSatuan({ comp_id: user.usaha.company_id, kd_barang: kd_barang })
    );
    const res = await get.payload;
    setData(res);
  };

  useEffect(() => {
    // if (barang_customer.match(/val.nama/g)) {
    //   setOpen(true);
    //   alert(val.nama);
    // }
    // val.nama === barang_customer ? setOpen(true) : setOpen(false);
  });

  return (
    <div>
      <li
        // onChange={val.nama === barang_customer ? setOpen(true) : setOpen(false)}
        className="item"
        onClick={() => handleClick(val.kd_barang, val.nama)}
      >
        {val.nama}
      </li>
      {open && (
        <>
          {/* ......testing...... */}
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
              barang_customer={barang_customer}
              satuan_customer={satuan_customer}
            />
          ))}
        </>
      )}
    </div>
  );
};
