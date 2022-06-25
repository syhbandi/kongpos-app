import {
  faFilter,
  faRefresh,
  faSearch,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import {
  getPenjualan,
  getPenjualanCount,
  reset,
} from "../../features/laporanPenjualanSlice";

const Penjualan = ({ jenis }) => {
  const dispatch = useDispatch();
  const initialState = {
    company_id: "comp2020110310015601",
    awal: new Date().toISOString().slice(0, 10),
    akhir: new Date().toISOString().slice(0, 10),
    jenis,
    search: "",
    order_col: "",
    order_type: "",
    limit: 0,
    length: 10,
    count_stats: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const { data, status, message, dataCount } = useSelector(
    (state) => state.laporanPenjualan
  );

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleReset = () => {
    setFormData(initialState);
    dispatch(getPenjualan(initialState));
    dispatch(getPenjualanCount({ ...initialState, count_stats: 1 }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(getPenjualan(formData));
    dispatch(getPenjualanCount({ ...formData, count_stats: 1 }));
  };

  const handlePage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    dispatch(getPenjualan({ ...formData, [e.target.id]: e.target.value }));
    dispatch(
      getPenjualanCount({
        ...formData,
        [e.target.id]: e.target.value,
        count_stats: 1,
      })
    );
  };

  const handleSort = (col, type) => {
    setFormData((prevState) => ({
      ...prevState,
      order_col: col,
      order_type: type,
    }));
    console.log(col, type);
    dispatch(getPenjualan({ ...formData, order_col: col, order_type: type }));
    dispatch(
      getPenjualanCount({
        ...formData,
        order_col: col,
        order_type: type,
        count_stats: 1,
      })
    );
  };

  useEffect(() => {
    setFormData(initialState);
    dispatch(getPenjualan(initialState));
    dispatch(getPenjualanCount({ ...initialState, count_stats: 1 }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, jenis]);

  return (
    <div className="flex flex-col gap-5 relative">
      <div className="rounded-lg bg-white shadow-lg p-5 flex flex-col md:flex-row items-center gap-2">
        <form
          className="flex flex-col md:flex-row gap-3 items-center w-full md:w-fit"
          onSubmit={handleFilter}
        >
          <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-fit">
            <label htmlFor="awal">Awal</label>
            <input
              id="awal"
              type="date"
              className="px-3 py-2 rounded-lg outline-none border border-gray-500 w-full md:w-fit"
              value={formData.awal}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-fit">
            <label htmlFor="akhir">Akhir</label>
            <input
              id="akhir"
              type="date"
              className="px-3 py-2 rounded-lg outline-none border border-gray-500 w-full md:w-fit"
              onChange={handleFormChange}
              value={formData.akhir}
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
        {/* jumlah data per page */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-5">
            <span>Menampilkan</span>
            <select
              id="length"
              onChange={handlePage}
              value={formData["length"]}
              className="outline-none border border-gray-500 px-3 py-2 rounded-lg cursor-pointer"
            >
              {[10, 25, 50, 100].map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <span>data</span>
          </div>
          {/* pencarian */}
          <form onSubmit={handleFilter}>
            <div className="flex items-center rounded-lg">
              <input
                type="text"
                id="search"
                placeholder="Cari"
                className="w-full md:w-56 outline-0 px-3 py-2 border border-gray-500 rounded-l-lg"
                onChange={handleFormChange}
                value={formData.search}
              />
              <button
                type="submit"
                className="p-3 rounded-r-lg bg-blue-700 border border-blue-700 text-white flex items-center hover:bg-blue-900 hover:border-blue-900"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>

        {/* table data */}
        {data && data.length > 0 ? (
          <Table
            data={data}
            handleSort={handleSort}
            colSort={formData.order_col}
            typeSort={formData.order_type}
          />
        ) : (
          <div className="w-full text-center mt-5">
            <div className="text-3xl text-yellow-500">
              <FontAwesomeIcon icon={faWarning} />
            </div>
            <div>Tidak mendapatkan data</div>
          </div>
        )}

        {/* footer */}
        <div className="flex flex-col md:flex-row items-center mt-3">
          <div className="font-bold">Total data: {dataCount}</div>
        </div>
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

export default Penjualan;
