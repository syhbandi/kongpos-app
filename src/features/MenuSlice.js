import {
  faDatabase,
  faTachometerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  menus: [
    {
      nama: "Dashboard",
      link: "/",
      icon: faTachometerAlt,
    },
    { nama: "Data master", link: "/master", icon: faDatabase },
    { nama: "Profil", link: "/profil", icon: faUser },
  ],
  open: true,
  openSm: false,
  menuAktif: {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
    setOpenSm: (state) => {
      state.openSm = !state.openSm;
    },
    setAktif: (state, action) => {
      state.menuAktif = action.payload;
    },
    setSubMenuAktif: (state, action) => {
      const index = state.menus.findIndex(
        (menu) => (menu.nama = action.payload.nama)
      );
      state.menus[index].subMenuAktif = !state.menus[index].subMenuAktif;
    },
  },
});

export const { setOpen, setAktif, setOpenSm, setSubMenuAktif } =
  menuSlice.actions;
export default menuSlice.reducer;
