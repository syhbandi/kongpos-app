import {
  faSort,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Table = ({}) => {
  const [order, setOrder] = useState({
    field: "",
    asc: true,
  });
  const data = [
    {
      no: 1,
      nama: "hana",
      alamat: "dompu",
      hobi: "membaca",
    },
    {
      no: 2,
      nama: "hana2",
      alamat: "dompu2",
      hobi: "insekyur",
    },
    {
      no: 3,
      nama: "hana3",
      alamat: "dompu3",
      hobi: "bersepeda",
    },
  ];
  const headers = data.length
    ? Object.keys(data[0]).map((value) => value)
    : ["Galat"];

  const handleColClick = (value) => {
    if (!data.length) {
      return;
    }

    const newOrder = order;

    if (newOrder.field === value) {
      if (!newOrder.asc) {
        Object.assign(newOrder, { field: "", asc: true });
      } else {
        Object.assign(newOrder, { ...newOrder, asc: false });
      }
    } else {
      newOrder.field = value;
    }
  };

  return (
    <table className="w-full border-collapse border-2">
      <thead className="bg-white">
        <tr className="border-1">
          {headers.map((value, index) => (
            <th key={index} className="border-2">
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
        {data.length ? (
          data.map((result, index) => (
            <tr key={index}>
              {headers.map((value, index) => (
                <td className="bg-white px-4 py-3 border-2" key={index}>
                  {result[value]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="bg-white px-4 py-3 border-2"
              colSpan={headers.length}
            >
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
