import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {};

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
