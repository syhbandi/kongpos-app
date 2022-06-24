import { useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { faFilter, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import {
  getPenjualan,
  getPenjualanCount,
} from "../../features/laporanPenjualanSlice";

const PenjualanPerdivisi = () => {
  const [data, setData] = useState([]);
  const [jmlRecord, setJmlRecord] = useState("");

  const [dateNow, setDateNow] = useState("");
  const initialValues = { awal: dateNow, akhir: dateNow, rec: 10 };
  const [formValues, setFormValues] = useState(initialValues);

  const [orderColumn, setOrderCol] = useState("");
  const [typeOrder, setType] = useState("");

  const [src, setSearch] = useState([]);

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1MzEwNDg2NCwibmJmIjoxNjUzMTA0ODY0LCJqdGkiOiJmS0l6QTM4RW51a2dqYVNiIiwic3ViIjo1OCwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.bCTrLRKVZOTj2__1H8zl2tkyLMK8isoKycvPDcaHV-4";
  const url = "http://misterkong.com/kong_api/pos/api/laporan/penjualan";
  // const authAxios = axios.create({
  //   baseURL:url,
  //   headers: {
  //       Authorization: `Bearer ${token}`
  //   }
  // })
  async function dt(
    company_id,
    awal,
    akhir,
    jenis,
    search,
    order_col,
    order_type,
    limit,
    length,
    count_stats
  ) {
    const getData = await axios.post(url, {
      company_id: company_id,
      awal: awal,
      akhir: akhir,
      jenis: jenis,
      search: search,
      order_col: order_col,
      order_type: order_type,
      limit: limit,
      length: length,
      count_stats: count_stats,
    });
    setData(getData.data);
  }
  async function jml_record(
    company_id,
    awal,
    akhir,
    jenis,
    search,
    order_col,
    order_type,
    limit,
    length,
    count_stats
  ) {
    const getData = await axios.post(url, {
      company_id: company_id,
      awal: awal,
      akhir: akhir,
      jenis: jenis,
      search: search,
      order_col: order_col,
      order_type: order_type,
      limit: limit,
      length: length,
      count_stats: count_stats,
    });
    setJmlRecord(getData.data);
  }

  const getPage = async (currentPage) => {
    const res = await axios.post(url, {
      company_id: "comp2020110310015601",
      awal: formValues.awal ? formValues.awal : dateNow,
      akhir: formValues.akhir ? formValues.akhir : dateNow,
      jenis: "1",
      search: src != "" ? src : "",
      order_col: orderColumn != "" ? orderColumn : "",
      order_type: typeOrder != "" ? typeOrder : "",
      limit: currentPage * formValues.rec,
      length: formValues.rec,
      count_stats: "0",
    });
    const data = res.data;
    return data;
  };

  const handlePageClick = async (dt) => {
    console.log(dt.selected);
    const commentsFromServer = await getPage(dt.selected);
    setData(commentsFromServer);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const hidden = (e) => {
    setFormErrors(validateHidden(formValues));
  };

  function submit(e) {
    e.preventDefault();
    dt(
      "comp2020110310015601",
      formValues.awal ? formValues.awal : dateNow,
      formValues.akhir ? formValues.akhir : dateNow,
      "1",
      "",
      "no_transaksi",
      "desc",
      "0",
      formValues.rec,
      "0"
    );
    jml_record(
      "comp2020110310015601",
      formValues.awal ? formValues.awal : dateNow,
      formValues.akhir ? formValues.akhir : dateNow,
      "1",
      "",
      "no_transaksi",
      "desc",
      "0",
      formValues.rec,
      "1"
    );
    // setFormErrors(validate(formValues));
    // setIsSubmit(true);
  }

  function Search(e) {
    e.preventDefault();
    dt(
      "comp2020110310015601",
      formValues.awal ? formValues.awal : dateNow,
      formValues.akhir ? formValues.akhir : dateNow,
      "1",
      src,
      "no_transaksi",
      "desc",
      "0",
      formValues.rec,
      "0"
    );
    jml_record(
      "comp2020110310015601",
      formValues.awal ? formValues.awal : dateNow,
      formValues.akhir ? formValues.akhir : dateNow,
      "1",
      src,
      "no_transaksi",
      "desc",
      "0",
      formValues.rec,
      "1"
    );
  }

  const OrderCol = (order_col, type) => {
    setOrderCol(order_col);
    setType(type);
    dt(
      "comp2020110310015601",
      formValues.awal ? formValues.awal : dateNow,
      formValues.akhir ? formValues.akhir : dateNow,
      "1",
      "",
      orderColumn,
      typeOrder,
      "0",
      formValues.rec,
      "0"
    );
    jml_record(
      "comp2020110310015601",
      formValues.awal ? formValues.awal : dateNow,
      formValues.akhir ? formValues.akhir : dateNow,
      "1",
      "",
      orderColumn,
      typeOrder,
      "0",
      formValues.rec,
      "1"
    );
  };

  const validate = (values) => {
    const errors = {};
    if (!values.awal) {
      errors.awal = "Tidak boleh kosong";
    }
    if (!values.akhir) {
      errors.akhir = "Tidak boleh kosong";
    }
    if (!values.rec) {
      errors.rec = "Tidak boleh kosong";
    }
    return errors;
  };
  const validateHidden = (values) => {
    const errors = {};
    if (values.awal) {
      errors.awal = "";
    }
    if (values.akhir) {
      errors.akhir = "";
    }
    if (values.rec) {
      errors.rec = "";
    }
    return errors;
  };
  const defaultDate = () => {
    var date = new Date().toISOString().slice(0, 10);
    setDateNow(date);
  };

  useEffect(() => {
    defaultDate();
    // dt(
    //   "comp2020110310015601",
    //   "2022/6/24",
    //   "2022/6/24",
    //   "1",
    //   "",
    //   "no_transaksi",
    //   "desc",
    //   "0",
    //   "10",
    //   "0"
    // );
    // jml_record(
    //   "comp2020110310015601",
    //   "2022/6/24",
    //   "2022/6/24",
    //   "1",
    //   "",
    //   "no_transaksi",
    //   "desc",
    //   "0",
    //   "10",
    //   "1"
    // );
  });

  document.addEventListener("DOMContentLoaded", function (event) {});

  return (
    <div className="rounded-lg bg-white shadow-lg p-5">
      {/* Laporan Penjualan Perdivisi */}
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <form onSubmit={(e) => submit(e)}>
        <div className="p-0 bg-white">
          <div className="grid grid-cols-4">
            <div className="p-0 bg-white rounded-md flex items-center justify-left">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-14">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Awal
                  </label>
                </div>
                <div className="md:w-40">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="date"
                    name="awal"
                    onChange={handleChange}
                    value={formValues.awal ? formValues.awal : dateNow}
                    // onBlur={hidden}
                  ></input>
                  <p className="text-xs text-red-600">{formErrors.awal}</p>
                </div>
              </div>
            </div>

            <div className="p-0 bg-white rounded-md flex items-center justify-left">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-14">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Akhir
                  </label>
                </div>
                <div className="md:w-40">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="date"
                    name="akhir"
                    onChange={handleChange}
                    value={formValues.akhir ? formValues.akhir : dateNow}
                    // onBlur={hidden}
                  ></input>
                  <p className="text-xs text-red-600">{formErrors.akhir}</p>
                </div>
              </div>
            </div>
            <div className="p-0 bg-white rounded-md flex items-center justify-left">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-40">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Pilih Jumlah Baris
                  </label>
                </div>
                <div className="md:w-28">
                  <label htmlFor="underline_select" className="sr-only">
                    Underline select
                  </label>
                  <select
                    id="underline_select"
                    name="rec"
                    onChange={handleChange}
                    value={formValues.rec}
                    // onClick={hidden}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <p className="text-xs text-red-600">{formErrors.rec}</p>
                </div>
              </div>
            </div>
            <div className="p-0 bg-white rounded-md flex items-center justify-left">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <button className="p-2 bg-stone-400 rounded-lg" type="submit">
                    <i className={faDotCircle}></i>
                    Filter
                  </button>
                </div>

                {/* <div className="md:w-2/3"></div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}

        {/* </div> */}
      </form>
      {/* <div className="w-80"> */}
      <form className="w-80 flex items-center" onSubmit={(e) => Search(e)}>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            cari
          </div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={src}
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          ></input>
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          cari
        </button>
      </form>
      {/* </div> */}

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              No. Transaksi{" "}
              <button
                onClick={() => OrderCol("no_transaksi", "asc")}
                className="w-4 bg-blue-600"
              >
                A
              </button>
              <button
                onClick={() => OrderCol("no_transaksi", "desc")}
                className="w-4 bg-amber-300"
              >
                D
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Divisi{" "}
              <button
                onClick={() => OrderCol("divisi", "asc")}
                className="w-4 bg-blue-600"
              >
                A
              </button>
              <button
                onClick={() => OrderCol("divisi", "desc")}
                className="w-4 bg-amber-300"
              >
                D
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Customer{" "}
              <button
                onClick={() => OrderCol("customer", "asc")}
                className="w-4 bg-blue-600"
              >
                A
              </button>
              <button
                onClick={() => OrderCol("customer", "desc")}
                className="w-4 bg-amber-300"
              >
                D
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Jumlah Item{" "}
              <button
                onClick={() => OrderCol("jml_item", "asc")}
                className="w-4 bg-blue-600"
              >
                A
              </button>
              <button
                onClick={() => OrderCol("jml_item", "desc")}
                className="w-4 bg-amber-300"
              >
                D
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Total{" "}
              <button
                onClick={() => OrderCol("total", "asc")}
                className="w-4 bg-blue-600"
              >
                A
              </button>
              <button
                onClick={() => OrderCol("total", "desc")}
                className="w-4 bg-amber-300"
              >
                D
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((result) => (
              <tr
                key={result.no_transaksi}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
              >
                <td className="px-6 py-4 text-center">{result.no_transaksi}</td>
                <td className="px-6 py-4 text-center">{result.divisi}</td>
                <td className="px-6 py-4 text-left">{result.customer}</td>
                <td className="px-6 py-4 text-center">{result.jml_item}</td>
                <td className="px-6 py-4 text-right">{result.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="p-0 bg-white">
        <div className="grid grid-cols-2">
          <div className="p-0 bg-white rounded-md flex items-center justify-left ">
            <strong>
              Jumlah Data : {jmlRecord && jmlRecord.jumlah_record}
            </strong>
          </div>
          <div className="p-0 bg-white rounded-md flex items-center justify-end">
            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              breakLabel={"..."}
              pageCount={jmlRecord && jmlRecord.jumlah_record / formValues.rec}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"inline-flex -space-x-px "}
              pageClassName={"inline-flex -space-x-px"}
              pageLinkClassName={
                "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              previousClassName={
                "py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              nextClassName={
                "py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              breakClassName={"inline-flex -space-x-px"}
              breakLinkClassName={
                "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              activeClassName="border border-cyan-300 dark:bg-gray-500 rounded-lg"
              activeLinkClassName="border border-cyan-300 dark:bg-gray-500 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PenjualanPercustomer = () => {
  const dispatch = useDispatch();
  const initialState = {
    company_id: "comp2020110310015601",
    awal: new Date().toISOString().slice(0, 10),
    akhir: new Date().toISOString().slice(0, 10),
    jenis: "2",
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

  const handleGet = () => {
    dispatch(getPenjualan(formData));
  };

  const handleGetCount = () => {
    const newFormData = { ...formData };
    newFormData.count_stats = 1;
    dispatch(getPenjualanCount(newFormData));
  };

  useEffect(() => {
    console.log("status", status);
    console.log(data);
    console.log(dataCount);
  }, [status, data, dataCount]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg w-full p-4">
        <button
          className="bg-blue-600 rounded-lg px-4 py-3 text-white font-medium"
          onClick={handleGet}
          disabled={status === "pending" ? true : false}
        >
          Get data
        </button>
        <button
          className="bg-blue-600 rounded-lg px-4 py-3 text-white font-medium"
          onClick={handleGetCount}
        >
          Get data
        </button>
      </div>
      <div className="mt-5 bg-white rounded-lg shadow-lg w-full p-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Kode Customer{" "}
                <button
                  // onClick={() => OrderCol("no_transaksi", "asc")}
                  className="w-4 bg-blue-600"
                >
                  A
                </button>
                <button
                  // onClick={() => OrderCol("no_transaksi", "desc")}
                  className="w-4 bg-amber-300"
                >
                  D
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Kode Divisi{" "}
                <button
                  // onClick={() => OrderCol("divisi", "asc")}
                  className="w-4 bg-blue-600"
                >
                  A
                </button>
                <button
                  // onClick={() => OrderCol("divisi", "desc")}
                  className="w-4 bg-amber-300"
                >
                  D
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Jumlah Nota{" "}
                <button
                  // onClick={() => OrderCol("customer", "asc")}
                  className="w-4 bg-blue-600"
                >
                  A
                </button>
                <button
                  // onClick={() => OrderCol("customer", "desc")}
                  className="w-4 bg-amber-300"
                >
                  D
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Divisi{" "}
                <button
                  // onClick={() => OrderCol("jml_item", "asc")}
                  className="w-4 bg-blue-600"
                >
                  A
                </button>
                <button
                  // onClick={() => OrderCol("jml_item", "desc")}
                  className="w-4 bg-amber-300"
                >
                  D
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Customer{" "}
                <button
                  // onClick={() => OrderCol("total", "asc")}
                  className="w-4 bg-blue-600"
                >
                  A
                </button>
                <button
                  // onClick={() => OrderCol("total", "desc")}
                  className="w-4 bg-amber-300"
                >
                  D
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Total{" "}
                <button
                  // onClick={() => OrderCol("total", "asc")}
                  className="w-4 bg-blue-600"
                >
                  A
                </button>
                <button
                  // onClick={() => OrderCol("total", "desc")}
                  className="w-4 bg-amber-300"
                >
                  D
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((result) => (
                <tr
                  key={result.kd_customer}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                >
                  <td className="px-6 py-4 text-center">
                    {result.kd_customer}
                  </td>
                  <td className="px-6 py-4 text-center">{result.kd_divisi}</td>
                  <td className="px-6 py-4 text-center">{result.jml_nota}</td>
                  <td className="px-6 py-4 text-left">{result.divisi}</td>
                  <td className="px-6 py-4 text-center">{result.customer}</td>
                  <td className="px-6 py-4 text-right">{result.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <strong>
          Jumlah Data :{" "}
          {/* {dataCount &&
            dataCount.map((count) => <span>{count.jumlah_record}</span>)} */}
        </strong>
      </div>
    </>
  );
};

const PenjualanPeruser = () => {
  return <div>Laporan Penjulan Peruser</div>;
};

const PenjualanPerkas = () => {
  return <div>Laporan Penjulan Perkas</div>;
};

const PenjualanPerbarang = () => {
  return <div>Laporan Penjulan Perbarang</div>;
};

const PenjualanPerpegawai = () => {
  return <div>Laporan Penjulan Perpegawai</div>;
};

export {
  PenjualanPerdivisi,
  PenjualanPercustomer,
  PenjualanPeruser,
  PenjualanPerkas,
  PenjualanPerbarang,
  PenjualanPerpegawai,
};
