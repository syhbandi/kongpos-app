import {
  faFilter,
  faRefresh,
  faSearch,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import {
  getPiutang,
  getPiutangCount,
  reset,
} from "../../features/laporanPiutangSlice";

const Piutang = ({ sumColumn }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialState = {
    company_id: user.usaha.company_id,
    kd_customer: "",
    periode: new Date().toISOString().slice(0, 10),
    order_col: "",
    order_type: "",
    limit: 0,
    length: 10,
    count_stats: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const [page, setPage] = useState(0);
  const { data, status, message, dataCount } = useSelector(
    (state) => state.laporanPiutang
  );

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      kd_customer: e.target.value,
    }));
  };

  const handleFormChangePeriode = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      periode: e.target.value,
    }));
  };

  const handleReset = () => {
    setFormData(initialState);
    dispatch(getPiutang(initialState));
    dispatch(getPiutangCount({ ...initialState, count_stats: 1 }));
    setPage(0);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, limit: 0 }));
    dispatch(getPiutang({ ...formData, limit: 0 }));
    dispatch(getPiutangCount({ ...formData, count_stats: 1, limit: 0 }));
    setPage(0);
  };

  const handlePage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      limit: 0,
    }));
    dispatch(
      getPiutang({ ...formData, [e.target.id]: e.target.value, limit: 0 })
    );
    setPage(0);
  };

  const handleSort = (col, type) => {
    setFormData((prevState) => ({
      ...prevState,
      order_col: col,
      order_type: type,
      limit: 0,
    }));
    dispatch(
      getPiutang({ ...formData, order_col: col, order_type: type, limit: 0 })
    );
    setPage(0);
  };

  const handlePaginate = (e) => {
    const newOffset = (e.selected * formData.length) % dataCount;
    setFormData((prevState) => ({ ...prevState, limit: newOffset }));
    dispatch(getPiutang({ ...formData, limit: newOffset }));
    setPage(e.selected);
  };

  useEffect(() => {
    setFormData(initialState);
    dispatch(getPiutang(initialState));
    dispatch(getPiutangCount({ ...initialState, count_stats: 1 }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  return (
    <div className="flex flex-col gap-5 relative">
      <div className="rounded-lg bg-white shadow-lg p-5 flex flex-col md:flex-row items-center gap-2">
        <form
          className="flex flex-col md:flex-row gap-3 items-center w-full md:w-fit"
          onSubmit={handleFilter}
        >
          <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-fit">
            <label htmlFor="akhir">Periode</label>
            <input
              id="akhir"
              type="date"
              className="px-3 py-2 rounded-lg outline-none border border-gray-500 w-full md:w-fit"
              onChange={handleFormChangePeriode}
              value={formData.periode}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
          >
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>
        </form>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-[#ffc90d] border border-[#ffc90d]  flex items-center gap-3 hover:bg-[#d7ae18] hover:border-[#d7ae18] w-full md:w-fit justify-center"
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faRefresh} />
          <span>Setel ulang</span>
        </button>
      </div>
      <div className="rounded-lg bg-white shadow-lg p-5 min-h-[200px]">
        {/* table data */}
        <Table
          data={data}
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
          sumColumn={sumColumn}
        />
      </div>

      {/* loader */}
      {status === "pending" ? (
        <div className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-xl font-bold">Sedang memuat...</div>
        </div>
      ) : status === "rejected" ? (
        <div className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-xl font-bold">{message}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Piutang;
