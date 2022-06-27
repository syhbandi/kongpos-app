import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarMenu = ({
  menu,
  aktif,
  open,
  openMobile,
  setAktif,
  setOpenMobile,
  setTitle,
}) => {
  const [subMenu, setSubMenu] = useState(false);
  const navigate = useNavigate();
  const navigasiMenu = (menu) => {
    if (menu.subMenu) {
      setSubMenu(!subMenu);
      return;
    }

    navigate(menu.link);
    setAktif(menu.title);
    setOpenMobile(false);
    setTitle(menu.title);
  };

  useEffect(() => {
    if (
      window.location.pathname.slice(1) === menu.link ||
      window.location.pathname === menu.link
    ) {
      setAktif(menu.title);
      setTitle(menu.title);
    }

    if (window.location.pathname.includes(menu.link) && menu.subMenu) {
      setSubMenu(true);
    }
  }, [menu.link, menu.subMenu, menu.title, setAktif, setTitle]);

  return (
    <div className="select-none">
      <div
        className={`flex items-center px-5 py-3 font-medium cursor-pointer rounded-lg mb-2 transition-all duration-300 ease-in-out ${
          menu.title === aktif ? "bg-[#ffc90d] shadow-lg" : ""
        } ${!open ? "justify-center" : ""}`}
        onClick={(e) => navigasiMenu(menu)}
      >
        <FontAwesomeIcon
          icon={menu.icon}
          className={`${open || openMobile ? "mr-3" : ""}`}
        />
        <span className="capitalize">
          {open || openMobile ? menu.title : ""}
        </span>
        <span className="ml-auto transition-all duration-300">
          {menu.subMenu ? (
            <FontAwesomeIcon icon={subMenu ? faCaretUp : faCaretDown} />
          ) : null}
        </span>
      </div>
      <div className={``}>
        {menu.subMenu && subMenu
          ? menu.subMenu.map((sub, index) => (
              <SidebarMenu
                menu={sub}
                key={index}
                open={open}
                openMobile={openMobile}
                aktif={aktif}
                setAktif={setAktif}
                setOpenMobile={setOpenMobile}
                setTitle={setTitle}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default SidebarMenu;
