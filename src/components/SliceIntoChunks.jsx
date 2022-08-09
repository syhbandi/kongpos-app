import { useEffect } from "react";
import { useState } from "react";
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
  const [checked, setChecked] = useState(false);
  const handleClickCheck = (key, status) => {
    console.log(key);
    // const a = "satuan_" + a_barang + "_" + a_satuan;
    // a.setAttr
    if (status === 2) {
      dt[0].status = 1;
    } else {
      dt[0].status = 2;
    }
    console.log(dt);
    // if
    // if (checked === false) {
    //   setChecked(true);
    // }
    // if (checked === true) {
    //   setChecked(false);
    // }
  };
  useEffect(() => {});

  return (
    <>
      {dt.map((val, index) => {
        return (
          <div className="radio">
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    name={kd_barang + "," + val.kd_satuan}
                    id={"satuan_" + kd_barang + "_" + val.kd_satuan}
                    // value={kd_barang + "," + val.kd_satuan + "," + val.status}
                    checked={val.status === "2" ? true : false || checked}
                    // checked={checked}
                    // onChange={() =>
                    //   handleChecked(
                    //     kd_barang,
                    //     val.kd_satuan,
                    //     status_barang,
                    //     val.status
                    //   )
                    // }
                    onClick={() => handleClickCheck(index, val.status)}
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
