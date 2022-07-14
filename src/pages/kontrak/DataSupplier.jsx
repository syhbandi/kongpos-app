import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSupplierResponse,
  getSupplierResponseCount,
  reset,
} from "../../features/supplierResponseContract";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../../components/Table";

export const DataSupplier = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialState = {
    comp_id: user.usaha.company_id,
    order_col: "",
    order_type: "",
    limit: 0,
    length: 10,
    search: "",
    count_stats: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const [page, setPage] = useState(0);
  const [dataSlice, setDataSlice] = useState([]);
  const [conditionValue, setConditionValue] = useState([]);
  const { data, status, message, dataCount } = useSelector(
    (state) => state.responseContract
  );
  const handlePaginate = (e) => {
    const jumlahRecord = dataCount ? dataCount["Jumlah Record"] : 0;
    const newOffset = (e.selected * formData.length) % jumlahRecord;
    setFormData((prevState) => ({ ...prevState, limit: newOffset }));
    dispatch(getSupplierResponse({ ...formData, limit: newOffset }));
    setPage(e.selected);
  };
  const handleFilter = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, limit: 0 }));
    dispatch(getSupplierResponse({ ...formData, limit: 0 }));
    dispatch(
      getSupplierResponseCount({ ...formData, count_stats: 1, limit: 0 })
    );
    setPage(0);
  };
  const handlePage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      limit: 0,
    }));
    dispatch(
      getSupplierResponse({
        ...formData,
        [e.target.id]: e.target.value,
        limit: 0,
      })
    );
    setPage(0);
  };
  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSort = (col, type) => {
    setFormData((prevState) => ({
      ...prevState,
      order_col: col,
      order_type: type,
      limit: 0,
    }));
    dispatch(
      getSupplierResponse({
        ...formData,
        order_col: col,
        order_type: type,
        limit: 0,
      })
    );
    setPage(0);
  };

  const handleClickButton = () => {
    console.log("hasil klik");
  };

  useEffect(() => {
    setFormData(initialState);

    // dt = formData.slice(1, 3);
    dispatch(getSupplierResponse(initialState));
    dispatch(getSupplierResponseCount({ ...initialState, count_stats: 1 }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  useEffect(() => {
    if (data) {
      // data.map((val) => console.log(val.nama));
      var arr = [];
      var conValue = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({
          ...Object.keys(data[i])
            .slice(1, 10)
            .reduce((result, key) => {
              result[key] = data[i][key];
              return result;
            }, {}),
          aksi: () =>
            data[i].status_response === 1 ? (
              <button onClick={handleClickButton}>klik</button>
            ) : (
              "null"
            ),
        });
        conValue.push(
          Object.keys(data[i])
            .slice(10, 11)
            .reduce((result, key) => {
              result[key] = data[i][key];

              return result;
            }, {})
        );
      }
    }
    setDataSlice(arr);
    // console.log(trueValue);

    setConditionValue(conValue);
  }, [data]);
  useEffect(() => {
    // console.log(conditionValue);
    // dataSlice.map((val) => console.log(val.nama));
    // const conditionValueV = Object.values(conditionValue);
    // console.log(conditionValueV);
    // conditionValue.map((value) => console.log(value.status_response));
  }, [conditionValue, data]);

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
          aksi={1}
          conditionValue={conditionValue}
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
