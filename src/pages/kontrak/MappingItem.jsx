import { useEffect } from "react";
import {
  getListSupplierA,
  reset,
} from "../../features/mappingItem/getListSupplier";
import {
  getListItemContracted,
  getListItemContractedCount,
  reset as resetItem,
} from "../../features/mappingItem/itemContracted";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Slice, SliceButton } from "../../components/SliceMappingItem";

export const MappingItem = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialState = {
    cid_customer: user.usaha.company_id,
    order_col: "",
    order_type: "",
    limit: 0,
    length: 10,
    search: "",
    count_stats: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const [page, setPage] = useState(0);
  const [dataSlice, setDataSlice] = useState({});
  const [key, setKey] = useState({});

  const { data, status, message } = useSelector(
    (state) => state.getSupplierContracted
  );
  const {
    data: dataItem,
    status: statusItem,
    message: messageItem,
    dataCount,
  } = useSelector((state) => state.getListItemContracted);

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(
      getListItemContracted({
        ...formData,
      })
    );
    dispatch(
      getListItemContractedCount({
        ...formData,
        count_stats: 1,
      })
    );
    // console.log(formData);
    setPage(0);
  };

  const handlePage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      limit: 0,
    }));
    dispatch(
      getListItemContracted({
        ...formData,
        [e.target.id]: e.target.value,
        limit: 0,
      })
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
      getListItemContracted({
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
    dispatch(getListItemContracted({ ...formData, limit: newOffset }));
    setPage(e.selected);
  };

  const handleChangeSupplier = (e) => {
    const value = e.target.value;
    const a = value.split("_");
    setFormData((prevstate) => ({
      ...prevstate,
      sup_key: value,
      id_cid_supplier: a[1],
      cid_customer: user.usaha.company_id,
    }));
  };
  useEffect(() => {
    dispatch(getListSupplierA({ comp_id: user.usaha.company_id }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);
  useEffect(() => {
    if (dataItem) {
      var arr = [];
      for (let i = 0; i < dataItem.length; i++) {
        arr.push({
          ...Object.keys(dataItem[i])
            .slice(9, 12)
            .reduce((result, key) => {
              result[key] = dataItem[i][key];
              return result;
            }, {}),
          "harga/satuan": (
            <Slice
              satuan={dataItem[i].satuan}
              jumlah={dataItem[i].jumlah}
              harga_jual={dataItem[i].harga_jual}
              stats={dataItem[i].stats}
            />
          ),
          aksi: (
            <SliceButton
              kd_satuan={dataItem[i].kd_satuan}
              satuan={dataItem[i].satuan}
              jumlah={dataItem[i].jumlah}
              harga_jual={dataItem[i].harga_jual}
              stats={dataItem[i].stats}
              kd_barang={dataItem[i].kd_barang}
              merk={dataItem[i].merk}
              nama={dataItem[i].nama}
            />
          ),
        });
      }
    }
    setDataSlice(arr);
  }, [dataItem, dataCount]);
  return (
    <>
      <div className="flex flex-col gap-5 relative">
        <div className="rounded-lg bg-white shadow-lg p-5 min-h-[50px]">
          <form onSubmit={handleFilter}>
            <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-fit">
              <span>Supplier</span>
              <select
                id="sup_key"
                onChange={handleChangeSupplier}
                className="outline-none border border-gray-500 px-10 py-2 rounded-lg cursor-pointer"
              >
                <option value="">Pilih Supplier</option>
                {data &&
                  data.map((value, index) => (
                    <option
                      key={index}
                      value={
                        value.kd_supplier + "_" + value.supplier_user_company_id
                      }
                    >
                      {value.nama}
                    </option>
                  ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-700 border border-blue-700 text-white flex items-center gap-3 hover:bg-blue-900 hover:border-blue-900 w-full md:w-fit justify-center"
              >
                <FontAwesomeIcon icon={faFilter} />
                <span>Filter</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-5 relative py-5">
        <div className="rounded-lg bg-white shadow-lg p-5 min-h-[200px]">
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
      </div>
    </>
  );
};
