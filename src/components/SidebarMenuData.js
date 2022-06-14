import {
  faContactBook,
  faDatabase,
  faFile,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";

export const menus = [
  { title: "dashboard", link: "/", icon: faTachometerAlt },
  {
    title: "master",
    link: "master",
    icon: faDatabase,
    subMenu: [
      { title: "barang", link: "master/barang", icon: faDatabase },
      {
        title: "barang satuan",
        link: "master/barangSatuan",
        icon: faDatabase,
      },
    ],
  },
  {
    title: "laporan",
    link: "laporan",
    icon: faFile,
    subMenu: [
      {
        title: "laba rugi",
        link: "laporan/labaRugi",
        icon: faDatabase,
        subMenu: [
          { title: "Harian", link: "laporan/labaRugi", icon: faDatabase },
        ],
      },
      {
        title: "Neraca",
        link: "laporan/neraca",
        icon: faDatabase,
      },
    ],
  },
  {
    title: "kontrak",
    link: "kontrak",
    icon: faContactBook,
  },
];
