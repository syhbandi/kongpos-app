import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const Master = () => {
  useEffect(() => {
    document.title = "KONGPOS | Master";
  });
  return (
    <>
      <div className="text-3xl font-bold">Master</div>
      <Outlet />
    </>
  );
};
