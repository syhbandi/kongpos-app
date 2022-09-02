import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBarangSatuan } from "../features/itemSupplier/postDataBarangSatuan";

function SliceIntoChunks({
  nama_satuan,
  mbs_status,
  kd_barang,
  kd_satuan,
  status_barang,
}) {
  const nama_satuan1 = nama_satuan.split(",");
  const mbs_status1 = mbs_status.split(",");
  const kd_satuan1 = kd_satuan.split(",");

  // console.log(kd_satuan1);
  const dt = [];
  nama_satuan1.forEach((val, index) => {
    dt.push({
      satuan: val,
      status: mbs_status1[index],
      kd_satuan: kd_satuan1[index],
      kd_barang: kd_barang,
      status_barang: status_barang,
    });
  });
  const [dataSatuan, setDataSatuan] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChangeChecked = (e) => {
    console.log(e.target);
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
  useEffect(() => {
    setDataSatuan(dt);
  }, [nama_satuan, mbs_status, kd_barang, kd_satuan, status_barang]);

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
                    checked={
                      val.status === "2" && status_barang === "2" ? true : false
                    }
                    onChange={handleChangeChecked}
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
