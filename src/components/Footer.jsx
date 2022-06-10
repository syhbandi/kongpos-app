import React from "react";

const Footer = () => {
  return (
    <div className="h-20 p-5 border-t-2 flex items-center bg-white justify-end mt-auto">
      <h1 className="text-lg">
        @{new Date().getFullYear()}{" "}
        <a href="https://misterkong.com" className="font-semibold">
          misterkong.com
        </a>{" "}
        All rights reserved
      </h1>
    </div>
  );
};

export default Footer;
