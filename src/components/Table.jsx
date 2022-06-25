import {
  faSort,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Table = ({ data }) => {
  const [order, setOrder] = useState({
    field: "",
    asc: true,
  });
  const headers = Object.keys(data[0]).map((value) => value);

  const handleColClick = (value) => {
    if (order.field === value) {
      if (!order.asc) {
        setOrder({ ...order, field: "", asc: true });
      } else {
        setOrder({ ...order, asc: false });
      }
    } else {
      setOrder({ ...order, field: value });
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead className="bg-white">
        <tr>
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
                />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((result, index) => (
          <tr key={index}>
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
