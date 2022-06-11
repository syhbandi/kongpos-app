import React from "react";

const Footer = () => {
  return (
    <div className="h-20 p-5 border-t-2 flex items-center bg-white justify-end mt-auto">
      <div>
        @{new Date().getFullYear()}{" "}
        <a href="https://pos.misterkong.com" className="font-semibold">
          KONGPOS by Misterkong
        </a>{" "}
        All rights reserved
      </div>
    </div>
  );
};

export default Footer;
