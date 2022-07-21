import {
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
import { postRequestContract } from "../../features/buatKontrak/postRequestContract";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import SweetAlert from "../../components/sweetAlert";

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
  const [modal, setModal] = useState(false);
  const { data, status, message, dataCount } = useSelector(
    (state) => state.buatKontrak
  );
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
    setLamaKontrak(e.target.value);
  };
  const handlePay = () => {};
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
  const ComponentAksi = ({
    status,
    cid_sumber,
    cid_tujuan,
    kd_customer,
    id_cid_tujuan,
  }) => {
    if (status == 0) {
      return (
        <button
          onClick={() =>
            handleModal(cid_sumber, cid_tujuan, kd_customer, id_cid_tujuan)
          }
          className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
        >
          <FontAwesomeIcon icon={faPaperPlane} />{" "}
        </button>
      );
    }
    if (status == -2) {
      return (
        <button className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center">
          <FontAwesomeIcon icon={faSpinner} />{" "}
        </button>
      );
    }
    if (status == -1) {
      return (
        <button
          onClick={() => handlePay()}
          className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
        >
          <FontAwesomeIcon icon={faDollar} />
          {" Bayar"}
        </button>
      );
    }
  };

  const handleModal = (cid_sumber, cid_tujuan, kd_customer, id_cid_tujuan) => {
    console.log(lamaKontrak);
    const reqContractParam = {
      cid_sumber: cid_sumber,
      cid_tujuan: cid_tujuan,
      kd_customer: kd_customer,
      id_cid_tujuan: id_cid_tujuan,
      // periode_bulan: lamaKontrak,
    };
    setRequestContractParam(reqContractParam);
    setModal(true);
  };
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    dispatch(
      postRequestContract({
        ...requestContractParam,
        periode_bulan: lamaKontrak != null ? lamaKontrak : 1,
      })
    );
    setModal(false);
    setFormData(initialState);
    dispatch(getCustomerContract(initialState));
    dispatch(getCustomerContractCount({ ...initialState, count_stats: 1 }));
    SweetAlert({ message: "Berhasil Mengajukan Permintaan" });
    setPage(0);
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
            />
          ),
        });
      }
    }
    setDataSlice(arr);
  }, [data]);

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

      <Modal open={modal} setOpen={setModal} modalHeader={"Permintaan Kontrak"}>
        <div>
          <form onSubmit={handleSubmitRequest}>
            <div className="flex items-center gap-5 mb-3 md:mb-0 py-20">
              <span>Pilih lama kontrak</span>
              <select
                id="periode_bulan"
                // value={lamaKontrak}
                onChange={handleChangeLamaKontrak}
                className="outline-none border border-gray-500 px-3 py-2 rounded-lg cursor-pointer"
              >
                {[1, 3, 6, 12].map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <span>Bulan</span>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
            >
              Kirim Permintaan
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
