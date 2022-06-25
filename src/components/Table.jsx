import {
  faSort,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Table = ({ data, handleSort }) => {
  const [order, setOrder] = useState({
    field: "",
    asc: true,
  });
  const headers = Object.keys(data[0]).map((value) => value);

  const handleColClick = (value) => {
    let newOrder = { ...order };
    if (newOrder.field === value) {
      if (!newOrder.asc) {
        newOrder = { field: "", asc: true };
      } else {
        newOrder.asc = false;
      }
    } else {
      newOrder.field = value;
    }

    setOrder(newOrder);
    handleSort(newOrder.field, newOrder.asc ? "asc" : "desc");
  };

  return (
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
                    order.field === value
                      ? order.asc
                        ? faSortAmountDown
                        : faSortAmountUp
                      : faSort
                  }
                  className={`${
                    order.field === value ? "text-black" : "text-gray-300"
                  }`}
                />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((result, index) => (
          <tr key={index}>
            <td className="bg-white px-4 py-3 border border-gray-500 text-center">
              {index + 1}
            </td>
            {headers.map((value, index) => (
              <td
                className="bg-white px-4 py-3 border border-gray-500"
                key={index}
              >
                {result[value]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
