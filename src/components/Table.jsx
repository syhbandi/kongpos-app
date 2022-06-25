import {
  faSort,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Table = ({ data, handleSort, colSort, typeSort }) => {
  const [order, setOrder] = useState({
    col: "",
    type: "",
  });
  const headers = Object.keys(data[0]).map((value) => value);

  const handleColClick = (value) => {
    let newOrder = { ...order };
    if (newOrder.col === value) {
      if (newOrder.type === "desc") {
        newOrder = { col: "", type: "" };
      } else {
        newOrder.type = "desc";
      }
    } else {
      newOrder.col = value;
    }
    setOrder(newOrder);
    handleSort(newOrder.col, newOrder.type);
  };

  useEffect(() => {
    setOrder({ col: colSort, type: typeSort });
  }, [colSort, typeSort]);

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
                    order.col === value
                      ? order.type === ""
                        ? faSortAmountDown
                        : faSortAmountUp
                      : faSort
                  }
                  className={`${
                    order.col === value ? "text-black" : "text-gray-300"
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
