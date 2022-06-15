import {
  faContactBook,
  faDatabase,
  faFile,
  faTachometerAlt,
  faCircle,
  faChevronRight,
  faDotCircle
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
        title: "Penjualan Perperiode",
        link: "laporan/laporan-penjualan-perperiode",
        icon: faDotCircle,
        subMenu: [
          { title: "Penjualan Perdivisi", link: "laporan/laporan-penjualan-perperiode/penjualan-perdivisi", icon: faCircle },
          { title: "Penjualan Percustomer", link: "laporan/laporan-penjualan-perperiode/penjualan-percustomer", icon: faCircle },
          { title: "Penjualan Peruser", link: "laporan/laporan-penjualan-perperiode/penjualan-peruser", icon: faCircle },
          { title: "Penjualan Perkas", link: "laporan/laporan-penjualan-perperiode/penjualan-perkas", icon: faCircle },
          { title: "Penjualan Perbarang", link: "laporan/laporan-penjualan-perperiode/penjualan-perbarang", icon: faCircle },
          { title: "Penjualan Perpegawai", link: "laporan/laporan-penjualan-perperiode/penjualan-perpegawai", icon: faCircle },
        ],
      },
      {
        title: "Pembelian Perperiode",
        link: "laporan/laporan-pembelian-perperiode",
        icon: faDotCircle,
        subMenu: [
          { title: "Pembelian Persupllier", link: "laporan/laporan-pembelian-perperiode/pembelian-persupplier", icon: faCircle },
          { title: "Pembelian Perdivisi", link: "laporan/laporan-pembelian-perperiode/pembelian-perdivisi", icon: faCircle },
          { title: "Pembelian Perkas", link: "laporan/laporan-pembelian-perperiode/pembelian-perkas", icon: faCircle },
          { title: "Pembelian Peruser", link: "laporan/laporan-pembelian-perperiode/pembelian-peruser", icon: faCircle },
          { title: "Pembelian Perbarang", link: "laporan/laporan-pembelian-perperiode/pembelian-perbarang", icon: faCircle },
        ],
      },
      {
        title: "Inventori",
        link: "laporan/laporan-inventori",
        icon: faDotCircle,
        subMenu: [
          { title: "Stok Akhir Perperiode", link: "laporan/laporan-inventori/stok-akhir-perperiode", icon: faCircle },
          { title: "Stok Akhir Perbarang", link: "laporan/laporan-inventori/stok-akhir-perbarang", icon: faCircle },
          { title: "Stok Akhir Perbarang Perdivisi", link: "laporan/laporan-inventori/stok-akhir-perbarang-perdivisi", icon: faCircle },
        ],
      },
      {
        title: "Biaya",
        link: "laporan/laporan-biaya",
        icon: faDotCircle,
        subMenu: [
          { title: "Biaya Perkas", link: "laporan/laporan-biaya/biaya-perkas", icon: faCircle },
          { title: "Biaya Perdivisi", link: "laporan/laporan-biaya/biaya-perdivisi", icon: faCircle },
          { title: "Biaya Perjenis Biaya", link: "laporan/laporan-biaya/biaya-perjenis-biaya", icon: faCircle },
        ],
      },
      {
        title: "Pendapatan",
        link: "laporan/laporan-pendapatan",
        icon: faDotCircle,
        subMenu: [
          { title: "Pendapatan Perkas", link: "laporan/laporan-pendapatan/pendapatan-perkas", icon: faCircle },
          { title: "Pendapatan Perdivisi", link: "laporan/laporan-pendapatan/pendapatan-perdivisi", icon: faCircle },
          { title: "Pendapatan Perjenis pendapatan", link: "laporan/laporan-pendapatan/pendapatan-perjenis-pendapatan", icon: faCircle },
        ],
      },
      {
        title: "Hutang",
        link: "laporan/laporan-hutang",
        icon: faDotCircle,
        subMenu: [
          { title: "Hutang Pembelian", link: "laporan/laporan-hutang/hutang-pembelian", icon: faCircle },
        ],
      },
      {
        title: "Piutang",
        link: "laporan/laporan-piutang",
        icon: faDotCircle,
        subMenu: [
          { title: "Piutang Penjualan", link: "laporan/laporan-piutang/piutang-penjualan", icon: faCircle },
        ],
      },
      {
        title: "Laba Rugi",
        link: "laporan/laba-rugi",
        icon: faDotCircle,
      },
    ],

  },
  {
    title: "kontrak",
    link: "kontrak",
    icon: faContactBook,
  },
];
