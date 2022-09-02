import { faFilter, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import {
  getListSupplier,
  getListSupplierCount,
  reset,
} from "../../features/itemSupplier";
import SliceIntoChunks from "../../components/SliceIntoChunks";
import {
  postBarangSatuan,
  reset as resetBarangSatuan,
} from "../../features/itemSupplier/postDataBarangSatuan";

const ItemSupplier = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialState = {
    comp_id: user.usaha.company_id,
    search: "",
    order_col: "",
    order_type: "",
    limit: 0,
    length: 10,
    count_stats: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const [page, setPage] = useState(0);
  const [dataSlice, setDataSlice] = useState({});
  const [checked, setChecked] = useState(false);
  const { data, status, message, dataCount } = useSelector(
    (state) => state.getItemSupplier
  );

  const { status: statusBarangSatuan, message: messageBarangSatuan } =
    useSelector((state) => state.postBarangSatuan);

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleReset = () => {
    setFormData(initialState);
    dispatch(getListSupplier(initialState));
    dispatch(getListSupplierCount({ ...initialState, count_stats: 1 }));
    setPage(0);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, limit: 0 }));
    dispatch(getListSupplier({ ...formData, limit: 0 }));
    dispatch(getListSupplierCount({ ...formData, count_stats: 1, limit: 0 }));
    setPage(0);
  };

  const handlePage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      limit: 0,
    }));
    dispatch(
      getListSupplier({ ...formData, [e.target.id]: e.target.value, limit: 0 })
    );
    setPage(0);
  };

  const handleSort = (col, type) => {
    setFormData((prevState) => ({
      ...prevState,
      order_col: col,
      order_type: type,
      limit: 0,
    }));
    dispatch(
      getListSupplier({
        ...formData,
        order_col: col,
        order_type: type,
        limit: 0,
      })
    );
    setPage(0);
  };

  const handlePaginate = (e) => {
    const jumlahRecord = dataCount ? dataCount["Jumlah Record"] : 0;
    const newOffset = (e.selected * formData.length) % jumlahRecord;
    setFormData((prevState) => ({ ...prevState, limit: newOffset }));
    dispatch(getListSupplier({ ...formData, limit: newOffset }));
    setPage(e.selected);
  };

  const handleChecked = (kd_barang, kd_satuan, status_barang, mbs_status) => {
    dispatch(
      postBarangSatuan({
        comp_id: user.usaha.company_id,
        kd_barang: kd_barang,
        kd_satuan: kd_satuan,
        status_barang: status_barang,
        mbs_status: mbs_status,
      })
    );
  };

  useEffect(() => {
    setFormData(initialState);
    dispatch(getListSupplier(initialState));
    dispatch(getListSupplierCount({ ...initialState, count_stats: 1 }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  useEffect(() => {
    if (data) {
      console.log(data);
      var arr = [];
      var arr_satuan = [];
      var arr_satuan_detail = [];
      for (let i = 0; i < data.length; i++) {
        arr_satuan = data[i].satuan.split(",");
        arr_satuan_detail.push(arr_satuan);
        arr.push({
          ...Object.keys(data[i])
            .slice(4, 8)
            .reduce((result, key) => {
              result[key] = data[i][key];
              return result;
            }, {}),
          aksi: (
            <SliceIntoChunks
              nama_satuan={data[i].satuan}
              mbs_status={data[i].mbs_status}
              kd_barang={data[i].kd_barang}
              kd_satuan={data[i].kd_satuan}
              handleChecked={handleChecked}
              status_barang={data[i].status_barang}
            />
          ),
        });
      }
    }
    setDataSlice(arr);
  }, [data]);

  return (
    <div className="flex flex-col gap-5 relative">
      <div className="rounded-lg bg-white shadow-lg p-5 min-h-[200px]">
        {/* table data */}
        <Table
          data={dataSlice}
          handleSort={handleSort}
          colSort={formData.order_col}
          typeSort={formData.order_type}
          offset={formData.limit}
          length={formData.length}
          search={formData.search}
          handlePage={handlePage}
          handleFilter={handleFilter}
          handleFormChange={handleFormChange}
          dataCount={dataCount}
          handlePaginate={handlePaginate}
          page={page}
        />
      </div>
      {/* loader */}
      {status === "pending" && (
        <div className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-xl font-bold">Sedang memuat...</div>
        </div>
      )}

      {status === "rejected" && (
        <div className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-xl font-bold">{message}</div>
        </div>
      )}
    </div>
  );
};

export default ItemSupplier;
