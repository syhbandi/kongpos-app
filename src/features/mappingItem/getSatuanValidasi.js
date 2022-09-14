import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSatuan } from "./mappingItemAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
};
export const getListSatuan = createAsyncThunk(
  "listSatuan/validasi",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await getSatuan(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const getListSatuanSlice = createSlice({
  name: "listSatuan",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.data = null;
      state.status = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(getListSatuan.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getListSatuan.rejected, (state, action) => {
        state.status = "rejected";
        state.message = "data tidak ada";
      })
      .addCase(getListSatuan.fulfilled, (state, action) => {
        // state.data = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = getListSatuanSlice.actions;
export default getListSatuanSlice.reducer;
