import { useEffect } from "react";
import Table from "../components/Table";

const Laporan = () => {
  useEffect(() => {
    document.title = "KONGPOS | Laporan";
  });
  return (
    <>
      <Table />
    </>
  );
};

export default Laporan;
