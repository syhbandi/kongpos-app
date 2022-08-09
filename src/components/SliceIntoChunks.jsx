import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBarangSatuan } from "../features/itemSupplier/postDataBarangSatuan";

function SliceIntoChunks({
  nama_satuan,
  mbs_status,
  kd_barang,
  kd_satuan,
  handleChecked,
  status_barang,
  data,
  // setChecked,
  // checked,
  // handleClickCheck,
}) {
  nama_satuan = nama_satuan.split(",");
  mbs_status = mbs_status.split(",");
  kd_satuan = kd_satuan.split(",");

  const dt = [];
  nama_satuan.forEach((val, index) => {
    dt.push({
      satuan: val,
      status: mbs_status[index],
      kd_satuan: kd_satuan[index],
    });
    // setChecked(c);
  });
  const [dataSatuan, setDataSatuan] = useState(dt);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChangeChecked = (e) => {
    console.log(e.target);
    // const e.target.id = dataSatuan.findIndex(
    //   (dt) => dt.kd_satuan === e.target.id
    // );
    const dataSatuanNew = [...dataSatuan];
    dataSatuanNew[e.target.id].status =
      dataSatuanNew[e.target.id].status === "2" ? "1" : "2";
    setDataSatuan(dataSatuanNew);
    dispatch(
      postBarangSatuan({
        comp_id: user.usaha.company_id,
        kd_barang,
        kd_satuan: dataSatuanNew[e.target.id].kd_satuan,
        status_barang,
        mbs_status: dataSatuanNew[e.target.id].status,
      })
    );
  };
  useEffect(() => {});

  return (
    <>
      {dataSatuan.map((val, index) => {
        return (
          <div className="radio" key={val.kd_satuan}>
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    name={kd_barang + "," + val.kd_satuan}
                    id={index}
                    // value={kd_barang + "," + val.kd_satuan + "," + val.status}
                    checked={val.status === "2" ? true : false}
                    // onChange={() =>
                    //   handleChecked(
                    //     kd_barang,
                    //     val.kd_satuan,
                    //     status_barang,
                    //     val.status
                    //   )
                    // }
                    onChange={handleChangeChecked}
                    // onClick={(e) => handleClickCheck(kd_barang, val.kd_satuan)}
                  />
                  {val.satuan + "," + kd_barang + "," + val.kd_satuan}
                </label>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default SliceIntoChunks;
