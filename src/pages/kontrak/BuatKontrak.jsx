import {
  faChain,
  faDollar,
  faFileSignature,
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerContract,
  getCustomerContractCount,
  reset,
} from "../../features/buatKontrak";
import {
  postRequestContract,
  reset as resetRequest,
} from "../../features/buatKontrak/postRequestContract";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../../components/Table";
import { Modal } from "../../components/Modal";
import Swal from "sweetalert2";
import SweetAlert from "../../components/sweetAlert";
import { postSelected } from "../../features/buatKontrak/getContractSelected";
import {
  postPayment,
  reset as resetPayment,
} from "../../features/buatKontrak/postPayment";

export const BuatKontrak = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialState = {
    comp_id: user.usaha.company_id,
    order_col: "",
    order_type: "",
    limit: 0,
    length: 0,
    search: "",
    count_stats: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const [dataSlice, setDataSlice] = useState([]);
  const [lamaKontrak, setLamaKontrak] = useState();
  const [requestContractParam, setRequestContractParam] = useState([]);
  const [page, setPage] = useState(0);
  const [modalRequest, setModalRequest] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [dtFile, setDtFile] = useState({});
  const [doPayment, setDoPayment] = useState({});

  const { data, status, message, dataCount } = useSelector(
    (state) => state.buatKontrak
  );

  const { dataSelected, statusSelected, messageSelected } = useSelector(
    (state) => state.getContractSelected
  );
  const {
    data: dataRequest,
    status: statusRequest,
    message: messageRequest,
  } = useSelector((state) => state.postRequestContract);
  const {
    data: dataPayment,
    status: statusPayment,
    message: messagePayment,
  } = useSelector((state) => state.postPaymentData);

  const handlePaginate = (e) => {
    const jumlahRecord = dataCount ? dataCount["Jumlah Record"] : 0;
    const newOffset = (e.selected * formData.length) % jumlahRecord;
    setFormData((prevState) => ({ ...prevState, limit: newOffset }));
    dispatch(getCustomerContract({ ...formData, limit: newOffset }));
    setPage(e.selected);
  };
  const handleFilter = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, limit: 0 }));
    dispatch(getCustomerContract({ ...formData, limit: 0 }));
    dispatch(
      getCustomerContractCount({ ...formData, count_stats: 1, limit: 0 })
    );
    setPage(0);
  };
  const handlePage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      limit: 0,
    }));
    dispatch(
      getCustomerContract({
        ...formData,
        [e.target.id]: e.target.value,
        limit: 0,
      })
    );
    setPage(0);
  };
  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleChangeLamaKontrak = (e) => {
    // console.log(e.target.value);
    setLamaKontrak(e.target.value);
  };
  const handleModalRequest = (
    cid_sumber,
    cid_tujuan,
    kd_customer,
    id_cid_tujuan
  ) => {
    // console.log(lamaKontrak);
    const reqContractParam = {
      cid_sumber: cid_sumber,
      cid_tujuan: cid_tujuan,
      kd_customer: kd_customer,
      id_cid_tujuan: id_cid_tujuan,
      // periode_bulan: lamaKontrak,
    };
    setRequestContractParam(reqContractParam);
    setModalRequest(true);
  };
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    document.getElementById("btn-request").classList.add("disabled");
    dispatch(
      postRequestContract({
        ...requestContractParam,
        periode_bulan: lamaKontrak != null ? lamaKontrak : 1,
      })
    );
    setModalRequest(false);
  };
  const handleModalPayment = (
    kontrak_id,
    cid_sumber,
    cid_tujuan,
    id_customer_config
  ) => {
    // console.log(id_customer_config);
    setDoPayment({
      id_kontrak: kontrak_id,
      cid_sumber: cid_sumber,
      cid_tujuan: cid_tujuan,
      id_customer_config: id_customer_config,
    });
    dispatch(
      postSelected({
        id_kontrak: kontrak_id,
        cid_sumber: cid_sumber,
        cid_tujuan: cid_tujuan,
      })
    );
    setModalPayment(true);
  };
  const handleSort = (col, type) => {
    setFormData((prevState) => ({
      ...prevState,
      order_col: col,
      order_type: type,
      limit: 0,
    }));
    dispatch(
      getCustomerContract({
        ...formData,
        order_col: col,
        order_type: type,
        limit: 0,
      })
    );
    setPage(0);
  };
  const handleChangeFile = (e) => {
    // e.preventDefault;
    setDtFile(e.target.files[0]);
  };
  async function handleSubmitPayment(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", dtFile);
    formData.append("cid_sumber", doPayment.cid_sumber);
    formData.append("cid_tujuan", doPayment.cid_tujuan);
    formData.append("id_kontrak", doPayment.id_kontrak);
    formData.append("periode", dataSelected[0].periode_bulan);
    formData.append("nominal_bayar", dataSelected[0].periode_bulan * 50000);
    formData.append("id_customer_config", doPayment.id_customer_config);
    dispatch(postPayment(formData));
    setModalPayment(false);
  }

  const ComponentAksi = ({
    status,
    cid_sumber,
    cid_tujuan,
    kd_customer,
    id_cid_tujuan,
    kontrak_id,
    id_customer_config,
  }) => {
    if (status === "0") {
      return (
        <button
          onClick={() =>
            handleModalRequest(
              cid_sumber,
              cid_tujuan,
              kd_customer,
              id_cid_tujuan
            )
          }
          className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
        >
          <FontAwesomeIcon icon={faPaperPlane} />{" "}
        </button>
      );
    }
    if (status === "-2") {
      return (
        <button className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center">
          <FontAwesomeIcon icon={faSpinner} />{" "}
        </button>
      );
    }
    if (status === "-1") {
      return (
        <button
          onClick={() =>
            handleModalPayment(
              kontrak_id,
              cid_sumber,
              cid_tujuan,
              id_customer_config
            )
          }
          className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
        >
          <FontAwesomeIcon icon={faDollar} /> Bayar
        </button>
      );
    }
    if (status === "1") {
      return (
        <button className="px-4 py-2 rounded-lg bg-green-600 border border-green-600 text-white flex items-center gap-3 hover:bg-green-900 hover:border-green-900 w-full md:w-fit justify-center">
          <FontAwesomeIcon icon={faChain} />{" "}
        </button>
      );
    }
  };

  const current_date = (date) => {
    let tgl = new Date(date);
    /* Date format you have */
    let dateDMY = `${tgl.getDate()}/${tgl.getMonth() + 1}/${tgl.getFullYear()}`;
    return dateDMY;
  };
  const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  useEffect(() => {
    setFormData(initialState);
    dispatch(getCustomerContract(initialState));
    dispatch(getCustomerContractCount({ ...initialState, count_stats: 1 }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);
  useEffect(() => {
    if (data) {
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({
          ...Object.keys(data[i])
            .slice(0, 7)
            .reduce((result, key) => {
              result[key] = data[i][key];
              return result;
            }, {}),
          aksi: (
            <ComponentAksi
              status={data[i].status}
              cid_sumber={data[i].cid_sumber}
              cid_tujuan={data[i].cid_tujuan}
              kd_customer={data[i].kd_customer}
              id_cid_tujuan={data[i].id_cid_tujuan}
              kontrak_id={data[i].kontrak_id}
              id_customer_config={data[i].id_customer_config}
            />
          ),
        });
      }
    }
    setDataSlice(arr);
  }, [data]);

  useEffect(() => {
    if (statusPayment === "rejected") {
      Swal.fire(
        messagePayment,
        "Silahkan pilih berkas dengan ketentuan tidak boleh lebih besar dari 10KB",
        "error"
      );
    }
    if (statusPayment === "fulfilled") {
      SweetAlert({
        message: "Berhasil Melakukan pembayaran kontrak",
        icon: "success",
      });
      setFormData(initialState);
      dispatch(getCustomerContract(initialState));
      dispatch(getCustomerContractCount({ ...initialState, count_stats: 1 }));
      dispatch(resetPayment());
    }
    if (statusRequest === "fulfilled") {
      SweetAlert({
        message: "Berhasil Melakukan permintaan kontrak",
        icon: "success",
      });
      setFormData(initialState);
      dispatch(getCustomerContract(initialState));
      dispatch(getCustomerContractCount({ ...initialState, count_stats: 1 }));
      dispatch(resetRequest());
    }
  }, [
    messagePayment,
    statusPayment,
    statusRequest,
    messageRequest,
    doPayment,
    dispatch,
    user,
  ]);

  return (
    <div className="flex flex-col gap-5 relative">
      <div className="rounded-lg bg-white shadow-lg p-5 min-h-[200px]">
        {/* table data */}
        <Table
          data={dataSlice}
          handleSort={handleSort}
          colSort={formData.order_col}
          typeSort={formData.order_type}
          offset={formData.limit}
          length={formData.length}
          search={formData.search}
          handlePage={handlePage}
          handleFilter={handleFilter}
          handleFormChange={handleFormChange}
          dataCount={dataCount}
          handlePaginate={handlePaginate}
          page={page}
        />
      </div>
      {/* loader */}
      {status === "pending" && (
        <div className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-xl font-bold">Sedang memuat...</div>
        </div>
      )}

      {status === "rejected" && (
        <div className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-xl font-bold">{message}</div>
        </div>
      )}

      <Modal
        open={modalRequest}
        setOpen={setModalRequest}
        modalHeader={"Permintaan Kontrak"}
      >
        <div>
          <div className="bg-yellow-400 rounded-md">
            <p className="px-5">
              Silahkan pilih lama kontrak(bulan) yang ingin anda ajukan kepada
              customer agar bisa dilanjutkan ke tahap berikutnya. Kontrak
              dibayarkan perbulan dengan biaya yang telah ditentukan oleh admin.
            </p>
          </div>

          <form onSubmit={handleSubmitRequest}>
            <div className="py-5 bg-white rounded-md flex items-center justify-left">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-40">
                  <label
                    className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Pilih lama kontrak
                  </label>
                </div>
                <div className="md:w-28">
                  <label htmlFor="underline_select" className="sr-only">
                    Underline select
                  </label>
                  <select
                    id="periode_bulan"
                    onChange={handleChangeLamaKontrak}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance dark:text-black dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {[1, 3, 6, 12].map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              id="btn-request"
              className="px-4 py-2 rounded-xl bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
            >
              Kirim Permintaan
            </button>
          </form>
        </div>
      </Modal>

      <Modal
        open={modalPayment}
        setOpen={setModalPayment}
        modalHeader={"Rincian Kontrak"}
      >
        <div></div>
        {dataSelected
          ? dataSelected.map(function (val, index) {
              return (
                <div key={val.id_kontrak}>
                  {/* {ComponentPayment(val.periode_bulan)} */}
                  <form onSubmit={handleSubmitPayment}>
                    <div className="md:flex md:items-center mb-6">
                      <div className="justify-start md:w-1/3">
                        <label
                          className=" text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name"
                        >
                          Periode Kontrak
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <span>
                          {current_date(val.tanggal_kontrak)} s/d{" "}
                          {current_date(val.tanggal_jatuh_tempo)}
                        </span>
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="justify-start md:w-1/3">
                        <label
                          className=" text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name"
                        >
                          Lama Kontrak
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <span>{val.periode_bulan} Bulan</span>
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="justify-start md:w-1/3">
                        <label
                          className=" text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name"
                        >
                          Biaya Kontrak
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <span>
                          Rp 50.000 x {val.periode_bulan} Bulan = Rp{" "}
                          {currencyFormat(50000 * val.periode_bulan)},-
                        </span>
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="justify-start md:w-1/3">
                        <label
                          className=" text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name"
                        >
                          Upload Bukti Pembayaran
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="file"
                          onChange={handleChangeFile}
                          // value={dtFile}
                        ></input>
                      </div>
                    </div>
                    <div className="py-5">
                      <button
                        className="rounded-sm px-10 py-1 text-white bg-blue-700 border border-blue-700 hover:bg-blue-900 hover:border-blue-900"
                        type="submit"
                      >
                        simpan
                      </button>
                    </div>
                  </form>
                </div>
              );
            })
          : ""}
      </Modal>
    </div>
  );
};
