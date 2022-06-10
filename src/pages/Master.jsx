import React, { useEffect } from "react";

export const Master = () => {
  useEffect(() => {
    document.title = "KONGPOS | Master";
  });
  return <div className="text-3xl font-bold">Master</div>;
};
