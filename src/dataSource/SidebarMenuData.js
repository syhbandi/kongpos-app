import {
  faContactBook,
  faDatabase,
  faFile,
  faTachometerAlt,
  faCircle,
  faChevronRight,
  faDotCircle,
  faStore,
  faChartBar,
  faChartColumn,
  faShoppingCart,
  faCreditCard,
  faMoneyCheckDollar,
  faCommentDollar,
  faCommentsDollar,
  faHandshake,
  faHandHoldingDollar,
  faPeopleArrowsLeftRight,
  faPeopleGroup,
  faPeopleArrows,
  faPersonCircleCheck,
  faPersonCirclePlus,
  faCodeFork,
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
        title: "Penjualan",
        link: "laporan/laporan-penjualan-perperiode",
        icon: faChartColumn,
        subMenu: [
          {
            title: "Penjualan Pernota",
            link: "laporan/laporan-penjualan-perperiode/penjualan-pernota",
            icon: faCircle,
          },
          {
            title: "Penjualan Percustomer",
            link: "laporan/laporan-penjualan-perperiode/penjualan-percustomer",
            icon: faCircle,
          },
          {
            title: "Penjualan Perdivisi",
            link: "laporan/laporan-penjualan-perperiode/penjualan-perdivisi",
            icon: faCircle,
          },
          {
            title: "Penjualan Perkas",
            link: "laporan/laporan-penjualan-perperiode/penjualan-perkas",
            icon: faCircle,
          },

          {
            title: "Penjualan Peruser",
            link: "laporan/laporan-penjualan-perperiode/penjualan-peruser",
            icon: faCircle,
          },

          {
            title: "Penjualan Perjenis Bayar",
            link: "laporan/laporan-penjualan-perperiode/penjualan-perjenis-bayar",
            icon: faCircle,
          },
          {
            title: "Penjualan pervoucher",
            link: "laporan/laporan-penjualan-perperiode/penjualan-pervoucher",
            icon: faCircle,
          },
          {
            title: "Penjualan Perhari",
            link: "laporan/laporan-penjualan-perperiode/penjualan-perhari",
            icon: faCircle,
          },
          {
            title: "Penjualan Perbulan",
            link: "laporan/laporan-penjualan-perperiode/penjualan-perbulan",
            icon: faCircle,
          },
          {
            title: "Penjualan Pertahun",
            link: "laporan/laporan-penjualan-perperiode/penjualan-pertahun",
            icon: faCircle,
          },
          {
            title: "Penjualan Perbarang",
            link: "laporan/laporan-penjualan-perperiode/penjualan-perbarang",
            icon: faCircle,
          },
          {
            title: "Penjualan Perpegawai",
            link: "laporan/laporan-penjualan-perperiode/penjualan-perpegawai",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Penjualan Order",
        link: "laporan/laporan-penjualan-order",
        icon: faChartColumn,
        subMenu: [
          {
            title: "Pernota",
            link: "laporan/laporan-penjualan-order/penjualan-order-pernota",
            icon: faCircle,
          },
          {
            title: "Percustomer",
            link: "laporan/laporan-penjualan-order/penjualan-order-percustomer",
            icon: faCircle,
          },
          {
            title: "Perdivisi",
            link: "laporan/laporan-penjualan-order/penjualan-order-perdivisi",
            icon: faCircle,
          },
          {
            title: "Perkas",
            link: "laporan/laporan-penjualan-order/penjualan-order-perkas",
            icon: faCircle,
          },

          {
            title: "Peruser",
            link: "laporan/laporan-penjualan-order/penjualan-order-peruser",
            icon: faCircle,
          },

          {
            title: "Perjenis Bayar",
            link: "laporan/laporan-penjualan-order/penjualan-order-perjenis-bayar",
            icon: faCircle,
          },
          {
            title: "pervoucher",
            link: "laporan/laporan-penjualan-order/penjualan-order-pervoucher",
            icon: faCircle,
          },
          {
            title: "Perhari",
            link: "laporan/laporan-penjualan-order/penjualan-order-perhari",
            icon: faCircle,
          },
          {
            title: "Perbulan",
            link: "laporan/laporan-penjualan-order/penjualan-order-perbulan",
            icon: faCircle,
          },
          {
            title: "Pertahun",
            link: "laporan/laporan-penjualan-order/penjualan-order-pertahun",
            icon: faCircle,
          },
          {
            title: "Perbarang",
            link: "laporan/laporan-penjualan-order/penjualan-order-perbarang",
            icon: faCircle,
          },
          {
            title: "Perpegawai",
            link: "laporan/laporan-penjualan-order/penjualan-order-perpegawai",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Penjualan Retur",
        link: "laporan/laporan-penjualan-retur",
        icon: faChartColumn,
        subMenu: [
          {
            title: "Pernota",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-pernota",
            icon: faCircle,
          },
          {
            title: "Percustomer",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-percustomer",
            icon: faCircle,
          },
          {
            title: "Perdivisi",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-perdivisi",
            icon: faCircle,
          },
          {
            title: "Perkas",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-perkas",
            icon: faCircle,
          },

          {
            title: "Peruser",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-peruser",
            icon: faCircle,
          },

          {
            title: "Perjenis Bayar",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-perjenis-bayar",
            icon: faCircle,
          },
          {
            title: "Perhari",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-perhari",
            icon: faCircle,
          },
          {
            title: "Perbulan",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-perbulan",
            icon: faCircle,
          },
          {
            title: "Pertahun",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-pertahun",
            icon: faCircle,
          },
          {
            title: "Perbarang",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-perbarang",
            icon: faCircle,
          },
          {
            title: "Perpegawai",
            link: "laporan/laporan-penjualan-retur/penjualan-retur-perpegawai",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Pembelian",
        link: "laporan/laporan-pembelian-perperiode",
        icon: faShoppingCart,
        subMenu: [
          {
            title: "Pembelian Pernota",
            link: "laporan/laporan-pembelian-perperiode/pembelian-pernota",
            icon: faCircle,
          },
          {
            title: "Pembelian Persupplier",
            link: "laporan/laporan-pembelian-perperiode/pembelian-persupplier-perdivisi",
            icon: faCircle,
          },
          {
            title: "Pembelian Perdivisi",
            link: "laporan/laporan-pembelian-perperiode/pembelian-perdivisi",
            icon: faCircle,
          },
          {
            title: "Pembelian Perkas",
            link: "laporan/laporan-pembelian-perperiode/pembelian-perkas",
            icon: faCircle,
          },
          {
            title: "Pembelian Peruser",
            link: "laporan/laporan-pembelian-perperiode/pembelian-peruser",
            icon: faCircle,
          },
          {
            title: "Pembelian Perjenis Bayar",
            link: "laporan/laporan-pembelian-perperiode/pembelian-perjenis-bayar",
            icon: faCircle,
          },
          {
            title: "Pembelian Perhari",
            link: "laporan/laporan-pembelian-perperiode/pembelian-perhari",
            icon: faCircle,
          },
          {
            title: "Pembelian Perbulan",
            link: "laporan/laporan-pembelian-perperiode/pembelian-perbulan",
            icon: faCircle,
          },
          {
            title: "Pembelian Pertahun",
            link: "laporan/laporan-pembelian-perperiode/pembelian-pertahun",
            icon: faCircle,
          },
          {
            title: "Pembelian Perbarang Perdivisi",
            link: "laporan/laporan-pembelian-perperiode/pembelian-perbarang-perdivisi",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Pembelian Order",
        link: "laporan/laporan-pembelian-order",
        icon: faShoppingCart,
        subMenu: [
          {
            title: "Pernota",
            link: "laporan/laporan-pembelian-order/pembelian-order-pernota",
            icon: faCircle,
          },
          {
            title: "Persupplier",
            link: "laporan/laporan-pembelian-order/pembelian-order-persupplier",
            icon: faCircle,
          },
          {
            title: "Perdivisi",
            link: "laporan/laporan-pembelian-order/pembelian-order-perdivisi",
            icon: faCircle,
          },
          {
            title: "Perkas",
            link: "laporan/laporan-pembelian-order/pembelian-order-perkas",
            icon: faCircle,
          },

          {
            title: "Peruser",
            link: "laporan/laporan-pembelian-order/pembelian-order-peruser",
            icon: faCircle,
          },
          {
            title: "pervoucher",
            link: "laporan/laporan-pembelian-order/pembelian-order-pervoucher",
            icon: faCircle,
          },
          {
            title: "Perhari",
            link: "laporan/laporan-pembelian-order/pembelian-order-perhari",
            icon: faCircle,
          },
          {
            title: "Perbulan",
            link: "laporan/laporan-pembelian-order/pembelian-order-perbulan",
            icon: faCircle,
          },
          {
            title: "Pertahun",
            link: "laporan/laporan-pembelian-order/pembelian-order-pertahun",
            icon: faCircle,
          },
          {
            title: "Perbarang",
            link: "laporan/laporan-pembelian-order/pembelian-order-perbarang",
            icon: faCircle,
          },
          {
            title: "Perpegawai",
            link: "laporan/laporan-pembelian-order/pembelian-order-perpegawai",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Pembelian Retur",
        link: "laporan/laporan-pembelian-retur",
        icon: faShoppingCart,
        subMenu: [
          {
            title: "Pernota",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-pernota",
            icon: faCircle,
          },
          {
            title: "Persupplier",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-persupplier",
            icon: faCircle,
          },
          {
            title: "Perdivisi",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-perdivisi",
            icon: faCircle,
          },
          {
            title: "Perkas",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-perkas",
            icon: faCircle,
          },

          {
            title: "Peruser",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-peruser",
            icon: faCircle,
          },
          {
            title: "pervoucher",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-pervoucher",
            icon: faCircle,
          },
          {
            title: "Perhari",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-perhari",
            icon: faCircle,
          },
          {
            title: "Perbulan",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-perbulan",
            icon: faCircle,
          },
          {
            title: "Pertahun",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-pertahun",
            icon: faCircle,
          },
          {
            title: "Perbarang",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-perbarang",
            icon: faCircle,
          },
          {
            title: "Perpegawai",
            link: "laporan/laporan-pembelian-retur/pembelian-retur-perpegawai",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Inventori",
        link: "laporan/laporan-inventori",
        icon: faStore,
        subMenu: [
          {
            title: "Stok Akhir Perperiode",
            link: "laporan/laporan-inventori/stok-akhir-perperiode",
            icon: faCircle,
          },
          {
            title: "Stok Akhir Perbarang",
            link: "laporan/laporan-inventori/stok-akhir-perbarang",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Biaya",
        link: "laporan/laporan-biaya",
        icon: faMoneyCheckDollar,
        subMenu: [
          {
            title: "Biaya Pernota",
            link: "laporan/laporan-biaya/biaya-pernota",
            icon: faCircle,
          },
          {
            title: "Biaya Perdivisi",
            link: "laporan/laporan-biaya/biaya-perdivisi",
            icon: faCircle,
          },
          {
            title: "Biaya Perkas",
            link: "laporan/laporan-biaya/biaya-perkas",
            icon: faCircle,
          },
          {
            title: "Biaya Peruser",
            link: "laporan/laporan-biaya/biaya-peruser",
            icon: faCircle,
          },
          {
            title: "Biaya Perjenis Biaya",
            link: "laporan/laporan-biaya/biaya-perjenis-biaya",
            icon: faCircle,
          },
          {
            title: "Biaya Perjenis Bayar",
            link: "laporan/laporan-biaya/biaya-perjenis-bayar",
            icon: faCircle,
          },
          {
            title: "Biaya Perhari",
            link: "laporan/laporan-biaya/biaya-perhari",
            icon: faCircle,
          },
          {
            title: "Biaya Perbulan",
            link: "laporan/laporan-biaya/biaya-perbulan",
            icon: faCircle,
          },
          {
            title: "Biaya Pertahun",
            link: "laporan/laporan-biaya/biaya-pertahun",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Pendapatan",
        link: "laporan/laporan-pendapatan",
        icon: faCommentsDollar,
        subMenu: [
          {
            title: "Pendapatan Pernota",
            link: "laporan/laporan-Pendapatan/pendapatan-pernota",
            icon: faCircle,
          },
          {
            title: "Pendapatan Perdivisi",
            link: "laporan/laporan-pendapatan/pendapatan-perdivisi",
            icon: faCircle,
          },
          {
            title: "Pendapatan Perkas",
            link: "laporan/laporan-pendapatan/pendapatan-perkas",
            icon: faCircle,
          },
          {
            title: "Pendapatan Peruser",
            link: "laporan/laporan-pendapatan/pendapatan-peruser",
            icon: faCircle,
          },
          {
            title: "Pendapatan Perjenis Pendapatan",
            link: "laporan/laporan-pendapatan/pendapatan-perjenis-pendapatan",
            icon: faCircle,
          },
          {
            title: "Pendapatan Perjenis Bayar",
            link: "laporan/laporan-pendapatan/pendapatan-perjenis-bayar",
            icon: faCircle,
          },
          {
            title: "Pendapatan Perhari",
            link: "laporan/laporan-pendapatan/pendapatan-perhari",
            icon: faCircle,
          },
          {
            title: "Pendapatan Perbulan",
            link: "laporan/laporan-pendapatan/pendapatan-perbulan",
            icon: faCircle,
          },
          {
            title: "Pendapatan Pertahun",
            link: "laporan/laporan-pendapatan/pendapatan-pertahun",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Hutang",
        link: "laporan/laporan-hutang",
        icon: faCreditCard,
        subMenu: [
          {
            title: "Hutang Pembelian",
            link: "laporan/laporan-hutang/hutang-pembelian",
            icon: faCircle,
          },
        ],
      },
      {
        title: "Piutang",
        link: "laporan/laporan-piutang",
        icon: faHandHoldingDollar,
        subMenu: [
          {
            title: "Piutang Penjualan",
            link: "laporan/laporan-piutang/piutang-penjualan",
            icon: faCircle,
          },
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
    icon: faHandshake,
    subMenu: [
      {
        title: "Buat Kontrak",
        link: "kontrak/buat-kontrak",
        icon: faPersonCirclePlus,
      },
      {
        title: "Data Supplier",
        link: "kontrak/data-supplier",
        icon: faPeopleGroup,
      },
      {
        title: "Permintaan Kontrak",
        link: "kontrak/permintaan-kontrak",
        icon: faPeopleArrows,
      },
      {
        title: "Mapper Item",
        link: "kontrak/mapper",
        icon: faCodeFork,
        subMenu: [
          {
            title: "Item Supplier",
            link: "kontrak/mapper/item-supplier",
            icon: faCircle,
          },
          {
            title: "Mapping Item",
            link: "kontrak/mapper/mapping-item",
            icon: faCircle,
          },
        ],
      },
    ],
  },
];
