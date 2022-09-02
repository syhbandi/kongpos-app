import { useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faCheckCircle,
  faInfo,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListBarang,
  reset,
} from "../features/mappingItem/getValidasiBarang";

export function Slice({
  satuan,
  jumlah,
  harga_jual,
  stats,
  kd_barang,
  merk,
  nama,
}) {
  satuan = satuan.split(",");
  jumlah = jumlah.split(",");
  harga_jual = harga_jual.split(",");
  stats = stats.split(",");

  const dt = [];
  satuan.forEach((val, index) => {
    dt.push({
      stn: val,
      jml: jumlah[index],
      hj: harga_jual[index],
      sts: stats[index],
    });
  });
  const [data, setData] = useState(dt);

  const currencyFormat = (num) => {
    return parseFloat(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  return (
    <>
      {data &&
        data.map((val, index) => {
          return (
            <div key={index}>
              <ul>
                <li>
                  {val.sts === "1" ? (
                    <button
                      type="button"
                      className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
                    >
                      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                    >
                      <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                    </button>
                  )}
                  {"Rp " +
                    currencyFormat(val.hj) +
                    "/" +
                    val.stn +
                    "[" +
                    val.jml +
                    "] "}
                </li>
              </ul>
            </div>
          );
        })}
    </>
  );
}

export function SliceButton({
  kd_satuan,
  satuan,
  jumlah,
  harga_jual,
  stats,
  kd_barang,
  merk,
  nama,
}) {
  kd_satuan = kd_satuan.split(",");
  satuan = satuan.split(",");
  jumlah = jumlah.split(",");
  harga_jual = harga_jual.split(",");
  stats = stats.split(",");

  const dt = [];
  satuan.forEach((val, index) => {
    dt.push({
      kd_stn: kd_satuan[index],
      stn: val,
      jml: jumlah[index],
      hj: harga_jual[index],
      sts: stats[index],
      kd_brg: kd_barang,
      merk_brg: merk,
      nama_brg: nama,
    });
  });
  const [dataa, setData] = useState(dt);
  const [modalRequest, setModalRequest] = useState(false);
  const [dataUp, setDataUp] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, status, message } = useSelector((state) => state.getListBarang);

  const Modal_up = (kd_brg_up, kd_stn_up, merk_brg_up, nama_brg_up) => {
    // setDataUp({
    //   kd_brg: kd_brg_up,
    //   kd_stn: kd_stn_up,
    //   merk_brg: merk_brg_up,
    //   nama_brg: nama_brg_up,
    // });
    // console.log(kd_brg_up, kd_stn_up, merk_brg_up, nama_brg_up);
    dispatch(
      getListBarang({ company_id: user.usaha.company_id, nama: nama_brg_up })
    );
    setModalRequest(true);
  };
  useEffect(() => {
    console.log(dataUp);
  }, [dataUp]);

  return (
    <>
      {dataa &&
        dataa.map((val, index) => {
          return (
            <div key={index}>
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      Modal_up(
                        val.kd_brg,
                        val.kd_stn,
                        val.merk_brg,
                        val.nama_brg
                      )
                    }
                    className="bg-green-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900"
                  >
                    Sesuaikan Item
                  </button>
                </li>
              </ul>
            </div>
          );
        })}
      <Modal
        open={modalRequest}
        setOpen={setModalRequest}
        modalHeader={"Validasi Produk"}
      >
        <div>
          {data &&
            data.map((val, index) => {
              return (
                <div>
                  <p>{val.nama}</p>
                </div>
              );
            })}
        </div>
      </Modal>
    </>
  );
}
