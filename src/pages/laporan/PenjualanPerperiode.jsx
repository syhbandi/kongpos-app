import { useState } from "react";
import axios from "axios";
import Page from "./Page";

const PenjualanPerdivisi = () => {
  const [data, setData] = useState();

  const [currentPage, setCurrentPage] = useState();
  // const [postPerPage, setPostPerPage] = useState(5);

  // const [company_id, setcompId] = useState("");

  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1MzEwNDg2NCwibmJmIjoxNjUzMTA0ODY0LCJqdGkiOiJmS0l6QTM4RW51a2dqYVNiIiwic3ViIjo1OCwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.bCTrLRKVZOTj2__1H8zl2tkyLMK8isoKycvPDcaHV-4";
  const url = "http://misterkong.com/kong_api/pos/api/laporan/penjualan";
  // const authAxios = axios.create({
  //   baseURL:url,
  //   headers: {
  //       Authorization: `Bearer ${token}`
  //   }
  // })

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
    setCurrentPage(getData.data);
    console.log(currentPage);
    // setCurrentPage(getData.data);
  }

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
    // setCurrentPage(getData.data);
  }

  function submit(e) {
    e.preventDefault();
    dt(
      "comp2020110310015601",
      "2022-05-01",
      "2022-06-30",
      "1",
      "",
      "total desc, no_transaksi",
      "desc",
      "0",
      "10",
      ""
    );
    jml_record(
      "comp2020110310015601",
      "2022-05-01",
      "2022-06-30",
      "1",
      "",
      "total desc, no_transaksi",
      "desc",
      "0",
      "10",
      "1"
    );
  }

  function page1(e) {
    e.preventDefault();
    dt(
      "comp2020110310015601",
      "2022-05-01",
      "2022-06-30",
      "1",
      "",
      "total desc, no_transaksi",
      "desc",
      "0",
      "10",
      ""
    );
    console.log(currentPage);
  }

  function page2(e) {
    e.preventDefault();
    dt(
      "comp2020110310015601",
      "2022-05-01",
      "2022-06-30",
      "1",
      "",
      "total desc, no_transaksi",
      "desc",
      "10",
      "10",
      ""
    );
  }

  return (
    <div className="rounded-lg bg-white shadow-lg p-5">
      Laporan Penjualan Perdivisi
      <form onSubmit={(e) => submit(e)}>
        {/* <inp  */}
        {/* <input onChange={(e)=> setAwal(e.target.value)} value={awal}  type="text" placeholder='Awal'></input>
          <input onChange={(e)=> setAkhir(e.target.value)} value={akhir}  type="text" placeholder='Akhir'></input>
          <input onChange={(e)=> setJenis(e.target.value)} value={jenis}  type="text" placeholder='Jenis'></input>
          <input onChange={(e)=> setLimit(e.target.value)} value={limit}  type="text" placeholder='Limit'></input>
          <input onChange={(e)=> setLength(e.target.value)} value={length}  type="text" placeholder='Length'></input>   */}
        <button className="p-2 bg-stone-400 rounded-lg" type="submit">
          Submit
        </button>

        <table className="border-collapse border border-slate-500">
          <thead>
            <tr className="py-4 hover:py-8">
              <th className="border border-slate-600">No. Transaksi</th>
              <th className="border border-slate-600">Divisi</th>
              <th className="border border-slate-600">Customer</th>
              <th className="border border-slate-600">Jumlah Item</th>
              <th className="border border-slate-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((result) => (
                <tr key={result.no_transaksi}>
                  <td className="border border-slate-600">
                    {result.no_transaksi}
                  </td>
                  <td className="border border-slate-600">{result.divisi}</td>
                  <td className="border border-slate-600">{result.customer}</td>
                  <td className="border border-slate-600">{result.jml_item}</td>
                  <td className="border border-slate-600">{result.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h5>{currentPage && currentPage.jumlah_record}</h5>

        <button
          onClick={(e) => page1(e)}
          className="p-2 bg-slate-400 rounded-lg"
          type="button"
        >
          1
        </button>
        <button
          onClick={(e) => page2(e)}
          className="p-2 bg-slate-400 rounded-lg"
          type="button"
        >
          2
        </button>
      </form>
      {/* <table>
        <tr>
          <td>
            {data && data.map(item=> item.divisi)}
          </td>
        </tr>
      </table> */}
      {/* <Page posts={currentPosts} /> */}
    </div>
  );
};

const PenjualanPercustomer = () => {
  return <div>Laporan Penjulan Percustomer</div>;
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
