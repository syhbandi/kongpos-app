import { faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSupplierCompare,
  getSupplierCompareCount,
  reset,
} from "../../features/permintaanKontrak";
import { getSupplierData } from "../../features/permintaanKontrak/getSupplier";
import { postCompare } from "../../features/permintaanKontrak/postCompareSupplier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import SweetAlert from "../../components/sweetAlert";

export const PermintaanKontrak = () => {
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
  const [page, setPage] = useState(0);
  const { data, status, message, dataCount } = useSelector(
    (state) => state.compareSupplier
  );
  const { dtSupplier, statusSup, messageSup } = useSelector(
    (state) => state.supplierData
  );
  const [sendPost, setSendPost] = useState({});
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [modal, setModal] = useState(false);
  const handlePaginate = (e) => {
    const jumlahRecord = dataCount ? dataCount["Jumlah Record"] : 0;
    const newOffset = (e.selected * formData.length) % jumlahRecord;
    setFormData((prevState) => ({ ...prevState, limit: newOffset }));
    dispatch(getSupplierCompare({ ...formData, limit: newOffset }));
    setPage(e.selected);
  };
  const handleFilter = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, limit: 0 }));
    dispatch(getSupplierCompare({ ...formData, limit: 0 }));
    dispatch(
      getSupplierCompareCount({ ...formData, count_stats: 1, limit: 0 })
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
      getSupplierCompare({
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
      getSupplierCompare({
        ...formData,
        order_col: col,
        order_type: type,
        limit: 0,
      })
    );
    setPage(0);
  };

  const handleModal = (id_cid_sumber, cid_sumber, cid_tujuan) => {
    console.log(id_cid_sumber, cid_sumber, cid_tujuan);
    setSendPost({
      id_cid_sumber: id_cid_sumber,
      cid_sumber: cid_sumber,
      cid_tujuan: cid_tujuan,
    });
    setModal(true);
  };

  const handleCheck = (val) => {
    setKodeSupplier(val);
  };
  const handlePostRequest = (e) => {
    e.preventDefault();
    // setSendPost((prevState) => ({ ...prevState, kd_supplier: kodeSupplier }));
    dispatch(postCompare({ ...sendPost, kd_supplier: kodeSupplier }));
    SweetAlert({ message: "Berhasil menambahkan supplier..." });
  };

  const pencarian = (e) => {
    e.preventDefault();
    var text = e.target.value;
    let sup_search = new RegExp(text, "i");
    let matchT = null;
    let find = [];
    dtSupplier &&
      dtSupplier.forEach((element) => {
        matchT = element.nama.match(sup_search);
        if (matchT == null) {
          document
            .getElementById(`div-` + element.kd_supplier)
            .classList.add("hidden");
        } else {
          // find.push({ kd_supplier: element.kd_supplier, nama: element.nama });
          document
            .getElementById(`div-` + element.kd_supplier)
            .classList.remove("hidden");
        }
      });
    // console.log(find);
  };

  useEffect(() => {
    setFormData(initialState);
    // console.log(user.usaha.company_id);
    const company_id = {
      comp_id: user.usaha.company_id,
    };
    dispatch(getSupplierCompare(initialState));
    dispatch(getSupplierCompareCount({ ...initialState, count_stats: 1 }));
    dispatch(getSupplierData(company_id));
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
            .slice(5, 11)
            .reduce((result, key) => {
              result[key] = data[i][key];
              return result;
            }, {}),
          aksi: (
            <>
              <button className="px-4 py-1 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center">
                Supplier Baru
              </button>
              <br />
              <button
                onClick={() =>
                  handleModal(
                    data[i].id_cid_sumber,
                    data[i].cid_sumber,
                    data[i].cid_tujuan
                  )
                }
                className="px-4 py-1 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
              >
                Sudah Terdaftar
              </button>
            </>
          ),
        });
      }
    }
    setDataSlice(arr);
  }, [data, dtSupplier]);

  // useEffect(() => {
  //   supFix && console.log(supFix);
  // }, [supFix]);

  return (
    <div className="flex flex-col gap-5 relative">
      <div className="rounded-lg bg-white shadow-lg p-5 min-h-[200px]">
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
      <Modal open={modal} setOpen={setModal} modalHeader={"Data Supplier"}>
        <div className="flex items-center rounded-lg p-3">
          <input
            type="search"
            id="search"
            placeholder="Cari"
            className="w-full md:w-90 outline-0 px-3 py-2 border border-slate-200 rounded-l-md  bg-gray-100 focus:border-cyan-50 focus:bg-white focus:ring focus:ring-cyan-300"
            onChange={pencarian}
          />
          <button
            type="button"
            className="p-3 rounded-r-md bg-gray-100 border border-slate-200 text-black flex items-center"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <hr />
        <div>
          <form onSubmit={handlePostRequest}>
            {dtSupplier &&
              dtSupplier.map(function (value, index) {
                return (
                  <div
                    key={value.kd_supplier}
                    className="flex items-center justify-between px-3 py-2"
                    id={`div-` + value.kd_supplier}
                  >
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 text-sm font-medium text-zinc-700 dark:text-zinc-700"
                    >
                      {value.nama}
                    </label>
                    <input
                      id={value.kd_supplier}
                      type="radio"
                      onClick={() => handleCheck(value.kd_supplier)}
                      value={value.nama}
                      name="Supplier"
                      className="w-4 h-4 justify-end text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                  </div>
                );
              })}
            <div className="flex items-end justify-end px-3 py-2">
              <button
                type="submit"
                className="rounded-sm px-10 py-1 text-white bg-gray-500"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
