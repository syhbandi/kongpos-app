import {
  faFileSignature,
  faPaperPlane,
  faQuestion,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSupplierResponse,
  getSupplierResponseCount,
  reset,
} from "../../features/supplierResponseContract";
import { postResponsRequest } from "../../features/supplierResponseContract/postRespontRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Swal from "sweetalert2";
import SweetAlert from "../../components/sweetAlert";

export const DataSupplier = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialState = {
    comp_id: user.usaha.company_id,
    order_col: "",
    order_type: "",
    limit: 0,
    length: 10,
    search: "",
    count_stats: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const [page, setPage] = useState(0);
  const [dataSlice, setDataSlice] = useState([]);
  const [modal, setModal] = useState(false);
  const { data, status, message, dataCount } = useSelector(
    (state) => state.responseContract
  );
  const handlePaginate = (e) => {
    const jumlahRecord = dataCount ? dataCount["Jumlah Record"] : 0;
    const newOffset = (e.selected * formData.length) % jumlahRecord;
    setFormData((prevState) => ({ ...prevState, limit: newOffset }));
    dispatch(getSupplierResponse({ ...formData, limit: newOffset }));
    setPage(e.selected);
  };
  const handleFilter = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, limit: 0 }));
    dispatch(getSupplierResponse({ ...formData, limit: 0 }));
    dispatch(
      getSupplierResponseCount({ ...formData, count_stats: 1, limit: 0 })
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
      getSupplierResponse({
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
  const handleSort = (col, type) => {
    setFormData((prevState) => ({
      ...prevState,
      order_col: col,
      order_type: type,
      limit: 0,
    }));
    dispatch(
      getSupplierResponse({
        ...formData,
        order_col: col,
        order_type: type,
        limit: 0,
      })
    );
    setPage(0);
  };

  function handleModal(value1, value2, value3, value4, value5, value6, value7) {
    // setModal(true);
    console.log(value1 + value2 + value3 + value4 + value5);
    const dtPostRequest = {
      kd_supplier: value1,
      kd_customer: value2,
      cid_sumber: value3,
      cid_tujuan: value4,
      periode: value5,
      id_cid_sumber: value6,
      id_cid_tujuan: value7,
    };
    Swal.fire({
      title: "Permintaan kontrak",
      text: "Apakah anda ingin menerima permintaan kontrak ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Terima",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        SweetAlert({ message: "Permintaan kontrak berhasil diterima." });
        // Swal.fire(
        //   "Berhasil",
        //   "Permintaan kontrak berhasil diterima.",
        //   "success"
        // );
        dispatch(postResponsRequest(dtPostRequest));
      }
    });
  }
  useEffect(() => {
    setFormData(initialState);
    dispatch(getSupplierResponse(initialState));
    dispatch(getSupplierResponseCount({ ...initialState, count_stats: 1 }));

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
            .slice(1, 10)
            .reduce((result, key) => {
              result[key] = data[i][key];
              return result;
            }, {}),
          aksi:
            data[i].status_kontrak == 0 ? (
              <button
                onClick={() =>
                  handleModal(
                    data[i].kd_supplier,
                    data[i].kd_customer,
                    data[i].cid_sumber,
                    data[i].cid_tujuan,
                    data[i]["Periode (Bulan)"],
                    data[i].id_cid_sumber,
                    data[i].id_cid_tujuan
                  )
                }
                className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
              >
                <FontAwesomeIcon icon={faFileSignature} />{" "}
              </button>
            ) : (
              <button
                disabled
                className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
              >
                <FontAwesomeIcon icon={faSpinner} />
              </button>
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
      <Modal
        open={modal}
        setOpen={setModal}
        modalHeader={"Konfirmasi Request"}
        // width={500}
        // maxHeight={700}
      >
        {/* sambil nunggu kasi loading */}
        <div className="flex justify-center py-6">
          <svg
            className="fill-current h-20 w-20 text-teal-500 mr-4 justify-center"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>

        <div>
          Apakah anda ingin menerima permintaan kontrak dari Supplier ini ?
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
            >
              Terima
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-red-600 border-blue-700 text-white flex items-center gap-3 hover:bg-red-800 hover:border-red-800 w-full md:w-fit justify-center"
            >
              Tolak
            </button>
          </div>
        </div>

        {/* kalo ada error kasi error */}
      </Modal>
    </div>
  );
};
