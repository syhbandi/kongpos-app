import {
  faSearch,
  faSort,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSortAmountUp,
  faSortAmountUpAlt,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Table = ({
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
}) => {
  const [order, setOrder] = useState({
    col: "",
    type: "",
  });
  const headers =
    data && data.length > 0 ? Object.keys(data[0]).map((value) => value) : null;

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
              className="w-full md:w-56 outline-0 px-3 py-2 border border-gray-500 rounded-l-lg"
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
          <thead className="bg-white">
            <tr>
              <th className="border border-gray-500">NO</th>
              {headers.map((value, index) => (
                <th key={index} className="border border-gray-500">
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
                <td className="px-4 py-3 border border-gray-500 text-center">
                  {index + offset + 1}
                </td>
                {headers.map((value, index) => (
                  <td className=" px-4 py-3 border border-gray-500" key={index}>
                    {result[value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
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
        <div className="font-bold">Total data: {dataCount}</div>
        <div className="ml-auto">
          <ReactPaginate
            forcePage={page}
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={Math.ceil(dataCount && dataCount / length)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePaginate}
            containerClassName={
              "inline-flex items-center select-none border-collapse"
            }
            pageLinkClassName={
              "p-3 bg-white font-medium border-y border-gray-500 text-blue-700 hover:bg-gray-200"
            }
            previousLinkClassName={
              "rounded-l-lg p-3 bg-white font-medium border-y border-l border-gray-500 text-blue-700 hover:bg-gray-200"
            }
            nextLinkClassName={
              "p-3 bg-white font-medium border-y border-r border-gray-500 text-blue-700 rounded-r-lg hover:bg-gray-200"
            }
            breakLinkClassName={
              "p-3 bg-white font-medium border-y border-gray-500 text-blue-700 hover:bg-gray-200"
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
