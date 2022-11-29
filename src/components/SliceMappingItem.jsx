import { useState } from "react";
import { Modal, ModalSubmit } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faCheckCircle,
  faEye,
  faInfo,
  faInfoCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListBarang,
  reset,
} from "../features/mappingItem/getValidasiBarang";
import { SatuanMapping } from "./SatuanMapItem";
import {
  postDataValidasi,
  reset as resetValidasi,
} from "../features/mappingItem/validasi";
import SweetAlert from "./sweetAlert";

export function Slice({
  satuan,
  jumlah,
  harga_jual,
  stats,
  kd_barang,
  merk,
  nama,
}) {
  const [data, setData] = useState([]);

  const currencyFormat = (num) => {
    return parseFloat(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  useEffect(() => {
    const setEffect = () => {
      const satuan_new = satuan.split(",");
      const jumlah_new = jumlah.split(",");
      const harga_jual_new = harga_jual.split(",");
      const stats_new = stats.split(",");
      const dt = [];
      satuan_new.forEach((val, index) => {
        dt.push({
          stn: val,
          jml: jumlah_new[index],
          hj: harga_jual_new[index],
          sts: stats_new[index],
        });
      });
      setData(dt);
    };
    setEffect();
  }, [stats, satuan, jumlah, harga_jual]);

  return (
    <>
      {data &&
        data.map((val, index) => {
          return (
            <div key={index}>
              <ul>
                <li>
                  {val.sts === "0" ? (
                    <button
                      type="button"
                      className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                    >
                      <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
                    >
                      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
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
  satuan_supplier,
  satuan,
  jumlah,
  harga_jual,
  stats,
  barang_supplier,
  merk,
  nama,
  kd_supplier,
  barang_customer,
  satuan_customer,
  reload,
}) {
  const [dataa, setDataa] = useState();
  const [modalRequest, setModalRequest] = useState(false);
  const [modalDet, setModalDet] = useState(false);
  const [modalSub, setModalSub] = useState(false);
  const [data, setData] = useState([]);
  const [kdStn, setKdStn] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { status, message } = useSelector((state) => state.getListBarang);
  const { status: statusValidasi, message: messageValidasi } = useSelector(
    (state) => state.postValidasi
  );

  const ModalUp = async (kd_brg_up, kd_stn_up, merk_brg_up, nama_brg_up) => {
    setModalRequest(true);
    const get = await dispatch(
      getListBarang({ company_id: user.usaha.company_id, nama: nama_brg_up })
    );
    const res = await get.payload;
    setData(res);
    setKdStn(kd_stn_up);
  };
  const ModalDetail = (barang_cus, satuan_cus, barang_sup, satuan_sup) => {
    setModalDet(true);
    setDataDetail({ barang_cus, satuan_cus, barang_sup, satuan_sup });
  };
  const Pencarian = async (e) => {
    const get = await dispatch(
      getListBarang({ company_id: user.usaha.company_id, nama: e.target.value })
    );
    const res = await get.payload;
    setData(res);
    console.log(data);
  };
  const submitSesuaikan = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const kd_barang_validasi = formData.get("default-radio").split("__")[0];
    const kd_satuan_validasi = formData.get("default-radio").split("__")[1];
    const kd_barang_supplier = formData.get("default-radio").split("__")[2];
    const kd_satuan_supplier = formData.get("default-radio").split("__")[3];
    const jumlah = formData.get("default-radio").split("__")[4];
    const kd_supplier_x = formData.get("default-radio").split("__")[5];
    const kd_supplier = kd_supplier_x.split("_")[0];
    dispatch(
      postDataValidasi({
        comp_id: user.usaha.company_id,
        user_id: user.usaha.user_id,
        kd_barang_validasi,
        kd_satuan_validasi,
        kd_supplier,
        kd_barang_supplier,
        kd_satuan_supplier,
        jumlah,
      })
    );
    reload();
    SweetAlert({
      message: "Berhasil validasi barang kontrak",
      icon: "success",
    });
    setModalRequest(false);
  };
  useEffect(() => {
    if (!modalRequest) {
      setData(null);
    }
  }, [modalRequest]);
  useEffect(() => {
    const setEffect = () => {
      const satuan_supplier_new = satuan_supplier.split(",");
      const satuan_new = satuan.split(",");
      const jumlah_new = jumlah.split(",");
      const harga_jual_new = harga_jual.split(",");
      const stats_new = stats.split(",");
      const satuan_customer_new = satuan_customer.split(",");

      const dt = [];
      satuan_new.forEach((val, index) => {
        dt.push({
          kd_stn: satuan_supplier_new[index],
          stn: val,
          jml: jumlah_new[index],
          hj: harga_jual_new[index],
          sts: stats_new[index],
          kd_brg: barang_supplier,
          merk_brg: merk,
          nama_brg: nama,
          brg_customer: barang_customer,
          stn_customer: satuan_customer_new[index],
        });
      });
      setDataa(dt);
    };
    setEffect();
  }, [satuan_supplier, satuan, jumlah, harga_jual, stats, satuan_customer]);
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
                      ModalUp(
                        val.kd_brg,
                        val.kd_stn,
                        val.merk_brg,
                        val.nama_brg
                      )
                    }
                    className="bg-green-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900"
                  >
                    Sesuaikan
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      ModalDetail(
                        val.brg_customer,
                        val.stn_customer,
                        val.nama_brg,
                        val.stn
                      )
                    }
                    className="bg-green-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900"
                  >
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
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
        scroll={false}
      >
        {status === "pending" && (
          <div className="flex justify-center p-4">
            <svg
              role="status"
              className="w-10 h-10 text-gray-200 animate-spin  fill-blue-700"
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
          </div>
        )}
        {/* {status === "fulfilled" ? ( */}
        <div className="flex flex-col">
          <div className="flex items-center rounded-lg p-3">
            <input
              type="search"
              id="search"
              placeholder="Cari"
              className="w-full md:w-90 outline-0 px-3 py-2 border border-slate-200 rounded-l-md  bg-gray-100 focus:border-cyan-50 focus:bg-white focus:ring focus:ring-cyan-300"
              onChange={Pencarian}
            />
            <button
              type="button"
              className="p-3 rounded-r-md bg-gray-100 border border-slate-200 text-black flex items-center"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <form onSubmit={submitSesuaikan}>
            <ul className="flex-grow overflow-auto h-[300px]">
              {data?.map((val, index) => {
                return (
                  <SatuanMapping
                    key={index}
                    val={val}
                    kd_supplier={kd_supplier}
                    kd_barang_supplier={barang_supplier}
                    kd_satuan_supplier={kdStn}
                    barang_customer={barang_customer}
                    satuan_customer={satuan_customer}
                  />
                );
              })}
            </ul>
            <div className="pt-3">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        open={modalDet}
        setOpen={setModalDet}
        modalHeader={"Detail Nama Produk Supplier & Anda"}
        scroll={false}
      >
        <div className="flex flex-col">
          <div className="flex items-center rounded-lg p-3">
            {/* <p>{dataDetail?.barang}</p> */}
            <table className="w-full border-collapse">
              <thead className="bg-white select-none">
                <tr>
                  <th className="px-4 py-3 border border-gray-400 text-center">
                    Supplier
                  </th>
                  <th className="px-4 py-3 border border-gray-400 text-center">
                    Customer
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="2"
                    className="border border-gray-400 text-center"
                  >
                    Nama Barang
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-gray-400 text-center">
                    {dataDetail.barang_sup}
                  </td>
                  <td className="px-4 py-3 border border-gray-400 text-center">
                    {dataDetail.barang_cus}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    className="border border-gray-400 text-center"
                  >
                    Satuan Barang
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-gray-400 text-center">
                    {dataDetail.satuan_sup}
                  </td>
                  <td className="px-4 py-3 border border-gray-400 text-center">
                    {dataDetail.satuan_cus}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
}
