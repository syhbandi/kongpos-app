import {
  faFileSignature,
  faSearch,
  faSort,
  faSortAmountDown,
  faSortAmountDownAlt,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Table = (props) => {
  const {
    data,
    handleSort,
    colSort,
    typeSort,
    offset,
    length,
    search,
    handlePage,
    handleFilter,
    handleFormChange,
    dataCount,
    handlePaginate,
    page,
    sumColumn,
  } = props;

  const [order, setOrder] = useState({
    col: "",
    type: "",
  });

  const headers =
    data && data.length > 0 ? Object.keys(data[0]).map((value) => value) : null;
  const totalPerPage =
    data && data.length > 0
      ? data.reduce((total, current) => (total += current["Total"]), 0)
      : 0;

  const handleColClick = (value) => {
    let newOrder = { ...order };
    if (newOrder.col.slice(1, newOrder.col.length - 1) === value) {
      if (newOrder.type === "desc") {
        newOrder = { col: "", type: "" };
      } else {
        newOrder.type = "desc";
      }
    } else {
      newOrder.col = "`" + value + "`";
    }
    setOrder(newOrder);
    handleSort(newOrder.col, newOrder.type);
  };

  const formatNumber = (number, currency = false) => {
    if (currency === false) {
      return new Intl.NumberFormat("id").format(number);
    }
    if (currency === "") {
      // return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      return number;
    }
    if (currency === true) {
      return new Intl.NumberFormat("id", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    }
  };
  const current_date = (date) => {
    let tgl = new Date(date);
    /* Date format you have */
    let dateDMY = `${tgl.getDate()}/${tgl.getMonth() + 1}/${tgl.getFullYear()}`;
    return dateDMY;
  };

  useEffect(() => {
    setOrder({ col: colSort, type: typeSort });
  }, [colSort, typeSort]);

  return (
    <>
      {/* jumlah data per page */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-3">
        <div className="flex items-center gap-5 mb-3 md:mb-0">
          <span>Menampilkan</span>
          <select
            id="length"
            onChange={handlePage}
            value={length}
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
              type="search"
              id="search"
              placeholder="Cari"
              className="w-full md:w-56 outline-0 px-3 py-2 border border-gray-500 rounded-l-lg focus:border-blue-700 bg-gray-100 focus:bg-white focus:ring focus:ring-blue-50"
              onChange={handleFormChange}
              value={search}
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

      {data && data.length > 0 ? (
        <table className="w-full border-collapse">
          <thead className="bg-white select-none">
            <tr>
              <th className="border border-gray-400">NO</th>
              {headers.map((value, index) => (
                <th key={index} className="border border-gray-400">
                  <button
                    className="flex items-center justify-between w-full px-4 py-3"
                    id={value}
                    onClick={() => handleColClick(value)}
                  >
                    <span className="uppercase font-bold">{value}</span>
                    <FontAwesomeIcon
                      icon={
                        order.col.slice(1, order.col.length - 1) === value
                          ? order.type === ""
                            ? faSortAmountDownAlt
                            : faSortAmountDown
                          : faSort
                      }
                      className={`${
                        order.col.slice(1, order.col.length - 1) === value
                          ? "text-black"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((result, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 bg-white cursor-pointer"
              >
                <td className="px-4 py-3 border border-gray-400 text-center">
                  {index + offset + 1}
                </td>
                {headers.map((value, index) => (
                  <td
                    className={`px-4 py-3 border border-gray-400 ${
                      isNaN(result[value]) ||
                      value === "Kode Barang" ||
                      value === "merk"
                        ? ""
                        : "text-right"
                    }`}
                    key={index}
                  >
                    {!isNaN(result[value])
                      ? value === "Kode Barang" ||
                        value === "hp" ||
                        value === "telepon" ||
                        value === "Periode (Bulan)" ||
                        value === "jumlah" ||
                        value === "merk"
                        ? result[value]
                        : formatNumber(
                            result[value],
                            value === "Jumlah Item" || value === "Jumlah Nota"
                              ? false
                              : true
                          )
                      : result[value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {sumColumn && sumColumn.length > 0
              ? sumColumn.map((col, index) => (
                  <tr key={index}>
                    <td
                      colSpan={headers.length}
                      className="px-4 py-2 text-right font-bold uppercase"
                    >
                      {col}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-right">
                      {formatNumber(
                        data.reduce(
                          (total, current) =>
                            (total += parseFloat(current[col])),
                          0
                        ),
                        col.includes("Total") || col.includes("Sisa")
                          ? true
                          : false
                      )}
                    </td>
                  </tr>
                ))
              : null}
          </tfoot>
        </table>
      ) : (
        <div className="w-full text-center mt-5">
          <div className="text-3xl text-yellow-500">
            <FontAwesomeIcon icon={faWarning} />
          </div>
          <div>Tidak mendapatkan data</div>
        </div>
      )}

      {/* footer */}
      <div className="flex flex-col md:flex-row items-center mt-5">
        <div className="flex flex-col md:flex-row font-bold flex-grow gap-5">
          {dataCount &&
            Object.keys(dataCount).map((item, index) => (
              <div className="flex gap-3" key={index}>
                <span>{item} : </span>
                <span>
                  {formatNumber(
                    dataCount[item],
                    item.includes("Total") || item.includes("Sisa")
                      ? true
                      : false
                  )}
                </span>
              </div>
            ))}
        </div>
        <div className="ml-auto">
          <ReactPaginate
            forcePage={page}
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={
              dataCount
                ? Math.ceil(
                    dataCount["Jumlah Record"] &&
                      dataCount["Jumlah Record"] / length
                  )
                : 0
            }
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePaginate}
            containerClassName={
              "inline-flex items-center select-none border-collapse"
            }
            pageLinkClassName={
              "p-3 bg-white font-medium border-y border-gray-400 text-blue-700 hover:bg-gray-200"
            }
            previousLinkClassName={
              "rounded-l-lg p-3 bg-white font-medium border-y border-l border-gray-400 text-blue-700 hover:bg-gray-200"
            }
            nextLinkClassName={
              "p-3 bg-white font-medium border-y border-r border-gray-400 text-blue-700 rounded-r-lg hover:bg-gray-200"
            }
            breakLinkClassName={
              "p-3 bg-white font-medium border-y border-gray-400 text-blue-700 hover:bg-gray-200"
            }
            activeLinkClassName="bg-blue-700 text-yellow-400 hover:bg-blue-700"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
